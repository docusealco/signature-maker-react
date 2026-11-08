import { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { SignatureMaker, type SignatureDetail, type SignatureMakerElement } from '../src'

const events: { type: string; base64: string | null }[] = []

;(window as any).events = events

function App() {
	const ref = useRef<SignatureMakerElement>(null)
	const [label, setLabel] = useState('Sign')

	;(window as any).setLabel = setLabel
	;(window as any).getElement = () => ref.current

	return (
		<div>
			<SignatureMaker
				ref={ref}
				className="my-signature"
				style={{ maxWidth: 600 }}
				withUpload={false}
				saveButtonText={label}
				saveButtonClass="btn"
				saveButtonDisabledClass="btn-disabled"
				saveButtonsDisabledStyle="opacity: 0.5;"
				onSave={(detail: SignatureDetail) => events.push({ type: 'save', base64: detail.base64 })}
				onChange={(detail: SignatureDetail) => events.push({ type: 'change', base64: detail.base64 })}
				{...((window as any).props || {})}
			/>
		</div>
	)
}

createRoot(document.getElementById('root')!).render(<App />)
