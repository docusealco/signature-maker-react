import path from 'node:path'
import { build } from 'esbuild'
import { expect, test, type Page } from '@playwright/test'

const DIR = __dirname
const BUNDLE = path.join(DIR, '../test-results/app.js')

test.beforeAll(async () => {
	await build({
		entryPoints: [path.join(DIR, 'app.tsx')],
		bundle: true,
		outfile: BUNDLE,
		jsx: 'automatic',
		define: { 'process.env.NODE_ENV': '"development"' },
		logLevel: 'silent',
	})
})

async function mount(page: Page) {
	await page.setContent('<!doctype html><html><body style="width: 800px;"><div id="root"></div></body></html>')
	await page.addScriptTag({ path: BUNDLE })
	await page.waitForSelector('signature-maker canvas')
}

async function draw(page: Page) {
	const box = (await page.locator('signature-maker canvas').boundingBox())!

	await page.mouse.move(box.x + 50, box.y + 50)
	await page.mouse.down()
	await page.mouse.move(box.x + 200, box.y + 100, { steps: 10 })
	await page.mouse.up()
}

const events = (page: Page) => page.evaluate(() => (window as any).events as { type: string; base64: string | null }[])

test('maps props to attributes and forwards the element ref', async ({ page }) => {
	await mount(page)

	const el = page.locator('signature-maker')
	await expect(el).toHaveClass('my-signature')
	await expect(el).toHaveAttribute('style', /max-width: 600px/)
	await expect(el).toHaveAttribute('data-with-upload', 'false')
	await expect(el).toHaveAttribute('data-save-button-text', 'Sign')
	await expect(el).not.toHaveAttribute('data-with-typed')
	await expect(page.locator('[data-target="uploadTypeButton"]')).toBeHidden()
	await expect(page.locator('[data-target="saveButton"]')).toHaveText('Sign')
	await expect(page.locator('[data-target="saveButton"]')).toHaveAttribute('class', 'btn btn-disabled')
	await expect(el).toHaveAttribute('data-save-button-disabled-style', 'opacity: 0.5;')

	expect(await page.evaluate(() => (window as any).getElement()?.tagName)).toBe('SIGNATURE-MAKER')
})

test('re-renders when props change', async ({ page }) => {
	await mount(page)
	await page.evaluate(() => (window as any).setLabel('Done'))
	await expect(page.locator('[data-target="saveButton"]')).toHaveText('Done')
})

test('calls onChange and onSave', async ({ page }) => {
	await mount(page)
	await draw(page)

	await page.waitForFunction(() => (window as any).events.some((e: { base64: string | null }) => e.type === 'change' && e.base64))
	await page.locator('[data-target="saveButton"]').click()
	await page.waitForFunction(() => (window as any).events.some((e: { type: string }) => e.type === 'save'))

	const saved = (await events(page)).find((e) => e.type === 'save')!
	expect(saved.base64).toMatch(/^iVBORw0KGgo/)
})

test('can be imported without a DOM', async () => {
	const cjs = require('../dist/index.cjs.js')

	expect(typeof cjs.SignatureMaker).toBe('object')
	expect(typeof cjs.default).toBe('object')
})
