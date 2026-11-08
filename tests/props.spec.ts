import path from 'node:path'
import { build } from 'esbuild'
import { expect, test } from '@playwright/test'

const BUNDLE = path.join(__dirname, '../test-results/props-app.js')

const BOOLEAN_PROPS = ['downloadOnSave', 'withTyped', 'withDrawn', 'withUpload', 'withColorSelect', 'withSubmit']

const STRING_PROPS = [
	'fontUrl',
	'controlButtonsContainerClass',
	'controlButtonsContainerStyle',
	'saveButtonText',
	'saveButtonClass',
	'saveButtonStyle',
	'saveButtonDisabledClass',
	'saveButtonsDisabledStyle',
	'undoButtonText',
	'undoButtonClass',
	'undoButtonStyle',
	'clearButtonText',
	'clearButtonClass',
	'clearButtonStyle',
	'textInputPlaceholder',
	'textInputClass',
	'textInputStyle',
	'canvasClass',
	'canvasStyle',
	'typeButtonsContainerClass',
	'typeButtonsContainerStyle',
	'drawTypeButtonText',
	'drawTypeButtonClass',
	'drawTypeButtonStyle',
	'drawTypeButtonActiveClass',
	'drawTypeButtonActiveStyle',
	'textTypeButtonText',
	'textTypeButtonClass',
	'textTypeButtonStyle',
	'textTypeButtonActiveClass',
	'textTypeButtonActiveStyle',
	'uploadTypeButtonText',
	'uploadTypeButtonClass',
	'uploadTypeButtonStyle',
	'uploadTypeButtonActiveClass',
	'uploadTypeButtonActiveStyle',
]

const ATTRIBUTE_OVERRIDES: Record<string, string> = { saveButtonsDisabledStyle: 'data-save-button-disabled-style' }

const attributeName = (prop: string) => ATTRIBUTE_OVERRIDES[prop] || `data-${prop.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)}`

test.beforeAll(async () => {
	await build({
		entryPoints: [path.join(__dirname, 'app.tsx')],
		bundle: true,
		outfile: BUNDLE,
		jsx: 'automatic',
		define: { 'process.env.NODE_ENV': '"development"' },
		logLevel: 'silent',
	})
})

test('every prop is rendered as its data attribute', async ({ page }) => {
	const props: Record<string, string | boolean> = {}

	for (const prop of BOOLEAN_PROPS) props[prop] = prop === 'downloadOnSave'
	for (const prop of STRING_PROPS) props[prop] = `${prop}-value`

	await page.setContent('<!doctype html><html><body><div id="root"></div></body></html>')
	await page.evaluate((props) => ((window as any).props = props), props)
	await page.addScriptTag({ path: BUNDLE })

	const el = page.locator('signature-maker')
	await expect(el).toHaveCount(1)

	for (const prop of BOOLEAN_PROPS) {
		await expect(el).toHaveAttribute(attributeName(prop), String(prop === 'downloadOnSave'))
	}

	for (const prop of STRING_PROPS) {
		await expect(el).toHaveAttribute(attributeName(prop), `${prop}-value`)
	}

	const names = await el.evaluate((node) => node.getAttributeNames().filter((name) => name.startsWith('data-')))
	expect(names.sort()).toEqual([...BOOLEAN_PROPS, ...STRING_PROPS].map(attributeName).sort())
})

test('props that are undefined or empty are not rendered', async ({ page }) => {
	await page.setContent('<!doctype html><html><body><div id="root"></div></body></html>')
	await page.evaluate(() => ((window as any).props = { withUpload: undefined, saveButtonText: '', fontUrl: undefined }))
	await page.addScriptTag({ path: BUNDLE })

	const el = page.locator('signature-maker')
	await expect(el).toHaveCount(1)
	await expect(el).not.toHaveAttribute('data-font-url')
	await expect(el).not.toHaveAttribute('data-with-upload')
	await expect(el).not.toHaveAttribute('data-save-button-text')
	await expect(page.locator('[data-target="saveButton"]')).toHaveText('Submit')
	await expect(page.locator('[data-target="uploadTypeButton"]')).toBeVisible()
})
