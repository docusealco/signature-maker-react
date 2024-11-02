<p align="center">
  <a href="https://www.docuseal.com/online-signature" target="_blank">
    <img width="600" height="356" src='https://github.com/user-attachments/assets/305904a9-291f-416d-ac32-baaf22970450' alt='Signature Maker'>
  </a>
</p>

# Signature Maker React

Signature Maker is a React component that lets users draw or type their signature.

#### Other implementations

- [Vanilla JS](https://github.com/docusealco/signature-maker-js)
- [Vue](https://github.com/docusealco/signature-maker-vue)

## Demo

Try the live demo [here](https://www.docuseal.com/online-signature)

## Documentation

Check out the full documentation [here](https://www.docuseal.com/docs/embedded/signature#react).

## Installation

```bash
npm install @docuseal/signature-maker-react
```

OR

```bash
yarn add @docuseal/signature-maker-react
```

## Usage

Basic Usage with standard styles and default signature saving behavior:

```jsx
import React from 'react'
import { SignatureMaker } from '@docuseal/signature-maker-react'

export function App() {
  return (
    <div className="app">
      <SignatureMaker downloadOnSave={true} />
    </div>
  );
}
```

---

Usage with default styles but custom signature saving behavior, such as uploading the signature to a server:

```jsx
import React from 'react'
import { SignatureMaker } from '@docuseal/signature-maker-react'

export function App() {
  const handleSave = (event) => {
    fetch('/save-signature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: event.base64 }),
    });
  }

  return (
    <div className="app">
      <SignatureMaker onSave={handleSave} />
    </div>
  );
}
```

---

Usage without a save signature button, embedded in another form. The signature will be stored in a form field named `signature`:

```jsx
import React, { useState } from 'react'
import { SignatureMaker } from '@docuseal/signature-maker-react'

export function App() {
  const [signatureBase64, setSignatureBase64] = useState(null);

  const handleSignatureChange = (event) => {
    setSignatureBase64(event.base64);
  }

  const handleSubmit = (event) => {
    fetch('/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: event.target.name.value,
        signature: signatureBase64
      }),
    });
  }

  return (
    <div className="app">
      <form id="myForm" onSubmit={handleSubmit}>
        <input name="name" type="text" />
        <SignatureMaker
          withSubmit={false}
          onChange={handleSignatureChange}
        >
        </SignatureMaker>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

```

---

Usage without a save signature button and tracking each signature change:

```jsx
import React from 'react'
import { SignatureMaker } from '@docuseal/signature-maker-react'

export function App() {
  const handleChange = (event) => {
    if (event.base64) {
      fetch('/background-save-signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: event.base64 }),
      });
    } else {
      console.log('No signature to save');
    }
  }

  return (
    <div className="app">
      <SignatureMaker
        withSubmit={false}
        onChange={handleChange}
      />
    </div>
  );
}
```

---

Usage with custom button labels and classes (DaisyUI):

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

---

Usage with customization of certain elements using CSS classes and styles:

```jsx
import React from 'react'
import { SignatureMaker } from '@docuseal/signature-maker-react'

export function App() {
  return (
    <div className="app">
      <SignatureMaker
        saveButtonClass="btn btn-neutral text-white text-base w-full"
        canvasClass="bg-white border border-base-300 rounded-2xl w-full"
        canvasStyle="border: 2px solid #000;"
      />
    </div>
  );
}
```

## Customization

Signature Maker can be customized with the following attributes:

```
downloadOnSave
withTyped
withDrawn
withUpload
withColorSelect
withSubmit
controlButtonsContainerClass
controlButtonsContainerStyle
saveButtonText
saveButtonClass
saveButtonStyle
saveButtonDisabledClass
saveButtonsDisabledStyle
undoButtonText
undoButtonClass
undoButtonStyle
clearButtonText
clearButtonClass
clearButtonStyle
textInputPlaceholder
textInputClass
textInputStyle
canvasClass
canvasStyle
typeButtonsContainerClass
typeButtonsContainerStyle
drawTypeButtonText
drawTypeButtonClass
drawTypeButtonStyle
drawTypeButtonActiveClass
drawTypeButtonActiveStyle
textTypeButtonText
textTypeButtonClass
textTypeButtonStyle
textTypeButtonActiveClass
textTypeButtonActiveStyle
uploadTypeButtonText
uploadTypeButtonClass
uploadTypeButtonStyle
uploadTypeButtonActiveClass
uploadTypeButtonActiveStyle
fontUrl
onSave
onChange
````

The full documentation with detailed configuration and event descriptions can be found [here](https://www.docuseal.com/docs/embedded/signature#react).

# License

MIT
