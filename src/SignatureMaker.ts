import { createElement, forwardRef, useEffect, useImperativeHandle, useRef, type CSSProperties } from 'react'
import '@docuseal/signature-maker-js'
import type { SignatureDetail, SignatureMakerElement } from '@docuseal/signature-maker-js'

export type { SignatureDetail, SignatureMakerElement }

export interface SignatureMakerProps {
	downloadOnSave?: boolean
	withTyped?: boolean
	withDrawn?: boolean
	withUpload?: boolean
	withColorSelect?: boolean
	withSubmit?: boolean
	fontUrl?: string
	controlButtonsContainerClass?: string
	controlButtonsContainerStyle?: string
	saveButtonText?: string
	saveButtonClass?: string
	saveButtonStyle?: string
	saveButtonDisabledClass?: string
	saveButtonsDisabledStyle?: string
	undoButtonText?: string
	undoButtonClass?: string
	undoButtonStyle?: string
	clearButtonText?: string
	clearButtonClass?: string
	clearButtonStyle?: string
	textInputPlaceholder?: string
	textInputClass?: string
	textInputStyle?: string
	canvasClass?: string
	canvasStyle?: string
	typeButtonsContainerClass?: string
	typeButtonsContainerStyle?: string
	drawTypeButtonText?: string
	drawTypeButtonClass?: string
	drawTypeButtonStyle?: string
	drawTypeButtonActiveClass?: string
	drawTypeButtonActiveStyle?: string
	textTypeButtonText?: string
	textTypeButtonClass?: string
	textTypeButtonStyle?: string
	textTypeButtonActiveClass?: string
	textTypeButtonActiveStyle?: string
	uploadTypeButtonText?: string
	uploadTypeButtonClass?: string
	uploadTypeButtonStyle?: string
	uploadTypeButtonActiveClass?: string
	uploadTypeButtonActiveStyle?: string
	className?: string
	style?: CSSProperties
	onSave?: (detail: SignatureDetail) => void
	onChange?: (detail: SignatureDetail) => void
}

const ATTRIBUTE_OVERRIDES: Record<string, string> = { saveButtonsDisabledStyle: 'data-save-button-disabled-style' }

const toAttributeName = (prop: string) => ATTRIBUTE_OVERRIDES[prop] || `data-${prop.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)}`

export const SignatureMaker = forwardRef<SignatureMakerElement, SignatureMakerProps>(function SignatureMaker(
	{ className, style, onSave, onChange, ...options },
	ref,
) {
	const elementRef = useRef<SignatureMakerElement>(null)

	useImperativeHandle(ref, () => elementRef.current!, [])

	useEffect(() => {
		const el = elementRef.current

		if (!el || !onSave) return

		const handler = (e: CustomEvent<SignatureDetail>) => onSave(e.detail)

		el.addEventListener('save', handler)

		return () => el.removeEventListener('save', handler)
	}, [onSave])

	useEffect(() => {
		const el = elementRef.current

		if (!el || !onChange) return

		const handler = (e: CustomEvent<SignatureDetail>) => onChange(e.detail)

		el.addEventListener('change', handler)

		return () => el.removeEventListener('change', handler)
	}, [onChange])

	const attributes: Record<string, unknown> = { ref: elementRef, className, style }

	for (const [key, value] of Object.entries(options)) {
		if (value !== undefined && value !== '') attributes[toAttributeName(key)] = String(value)
	}

	return createElement('signature-maker', attributes)
})

export default SignatureMaker
