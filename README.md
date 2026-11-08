<p align="center">
  <a href="https://www.docuseal.com/online-signature" target="_blank">
    <img width="600" height="356" src='https://github.com/user-attachments/assets/305904a9-291f-416d-ac32-baaf22970450' alt='Signature Maker'>
  </a>
</p>

# Signature Maker React

React component that lets users draw, type or upload their signature and returns it as a PNG. A thin wrapper around the [signature-maker-js](https://github.com/docusealco/signature-maker-js) web component.

[Live demo](https://www.docuseal.com/online-signature) · [Documentation](https://www.docuseal.com/docs/embedded/signature#react) · [JS](https://github.com/docusealco/signature-maker-js) · [Vue](https://github.com/docusealco/signature-maker-vue)

## Installation

```bash
npm install @docuseal/signature-maker-react
# or
yarn add @docuseal/signature-maker-react
```

Requires React 18 or 19. Works with server-side rendering.

## Usage

No handlers needed: the Submit button downloads the signature as a PNG.

```jsx
import { SignatureMaker } from '@docuseal/signature-maker-react'

export function App() {
  return <SignatureMaker downloadOnSave={true} />
}
```

Handle the signature when the user clicks Submit:

```jsx
import { SignatureMaker } from '@docuseal/signature-maker-react'

export function App() {
  const handleSave = (detail) => {
    fetch('/save-signature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: detail.base64 }),
    })
  }

  return <SignatureMaker onSave={handleSave} />
}
```

Embed in a form without the Submit button and track every change:

```jsx
import { useState } from 'react'
import { SignatureMaker } from '@docuseal/signature-maker-react'

export function App() {
  const [signatureBase64, setSignatureBase64] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    fetch('/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: event.target.name.value, signature: signatureBase64 }),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" />
      <SignatureMaker withSubmit={false} onChange={(detail) => setSignatureBase64(detail.base64)} />
      <button type="submit">Submit</button>
    </form>
  )
}
```

Restyle with CSS classes and translate the labels. A full DaisyUI example:

```jsx
import React from 'react'
import { SignatureMaker } from '@docuseal/signature-maker-react'

export function App() {
  return (
    <div className="app">
      <SignatureMaker
        className="block my-8"
        saveButtonText="Télécharger"
        undoButtonText="Annuler"
        clearButtonText="Clair"
        drawTypeButtonText="Dessiner"
        textTypeButtonText="Type"
        uploadTypeButtonText="Télécharger"
        textInputPlaceholder="Tapez votre signature ici"
        typeButtonsContainerClass="flex gap-2 mb-4 justify-center"
        drawTypeButtonClass="flex items center justify-center py-3 w-40 uppercase border-neutral-focus space-x-2 border rounded-3xl cursor-pointer hover:bg-neutral hover:text-white hover:font-semibold"
        drawTypeButtonActiveClass="bg-neutral text-white font-semibold"
        textTypeButtonClass="flex items center justify-center py-3 w-40 uppercase border-neutral-focus space-x-2 border rounded-3xl cursor-pointer hover:bg-neutral hover:text-white hover:font-semibold"
        textTypeButtonActiveClass="bg-neutral text-white font-semibold"
        uploadTypeButtonClass="flex items center justify-center py-3 w-40 uppercase border-neutral-focus space-x-2 border rounded-3xl cursor-pointer hover:bg-neutral hover:text-white hover:font-semibold"
        uploadTypeButtonActiveClass="bg-neutral text-white font-semibold"
        textInputClass="input mb-4 input-bordered bg-white text-2xl w-full h-14 rounded-2xl"
        canvasClass="bg-white border border-base-300 rounded-2xl w-full"
        undoButtonClass="btn btn-outline btn-sm font-medium"
        clearButtonClass="btn btn-outline btn-sm font-medium"
        saveButtonClass="btn btn-neutral text-white text-base w-full"
      />
    </div>
  );
}
```

## Events

| Prop | When | Argument |
|---|---|---|
| `onSave` | Submit button clicked | `{ base64, blob }` |
| `onChange` | Signature drawn, typed, uploaded or cleared | `{ base64, blob }`, both `null` when empty |

`ref` gives access to the underlying element with `enableDrawPanel()`, `enableTextPanel()`, `enableUploadPanel()` and the [signature_pad](https://github.com/szimek/signature_pad) instance as `pad`. TypeScript declarations are included:

```tsx
import { useRef } from 'react'
import { SignatureMaker, type SignatureDetail, type SignatureMakerElement } from '@docuseal/signature-maker-react'

const ref = useRef<SignatureMakerElement>(null)
const handleSave = (detail: SignatureDetail) => console.log(detail.base64)

<SignatureMaker ref={ref} onSave={handleSave} />
```

## Props

Behavior:

| Prop | Default | Description |
|---|---|---|
| `withDrawn` | `true` | Show the Draw tab |
| `withTyped` | `true` | Show the Type tab |
| `withUpload` | `true` | Show the Upload tab |
| `withColorSelect` | `true` | Show the pen color picker |
| `withSubmit` | `true` | Show the Submit button |
| `downloadOnSave` | `false` | Download the PNG on Submit |
| `fontUrl` | Dancing Script | WOFF font used for typed signatures |
| `className`, `style` | | Applied to the `<signature-maker>` element itself |

Labels: `saveButtonText`, `undoButtonText`, `clearButtonText`, `drawTypeButtonText`, `textTypeButtonText`, `uploadTypeButtonText`, `textInputPlaceholder`.

Styles: every element below accepts `<element>Class` and `<element>Style` (a CSS string). A class replaces the default inline styles, a style overrides them. State variants are appended to the base class or style.

| Element | State variants |
|---|---|
| `saveButton` | `saveButtonDisabledClass`, `saveButtonsDisabledStyle` |
| `drawTypeButton`, `textTypeButton`, `uploadTypeButton` | `ActiveClass`, `ActiveStyle` |
| `undoButton`, `clearButton`, `textInput`, `canvas`, `typeButtonsContainer`, `controlButtonsContainer` | |

Example: `drawTypeButtonClass="tab"` plus `drawTypeButtonActiveClass="tab-active"` renders `class="tab tab-active"` while Draw is selected.

## License

MIT
