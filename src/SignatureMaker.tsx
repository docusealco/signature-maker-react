import React from 'react'
import '@docuseal/signature-maker-js'

interface SignatureMakerProps {
  downloadOnSave?: boolean,
  withTyped?: boolean,
  withDrawn?: boolean,
  withUpload?: boolean,
  withColorSelect?: boolean,
  withSubmit?: boolean,
  controlButtonsContainerClass?: string,
  controlButtonsContainerStyle?: string,
  saveButtonText?: string,
  saveButtonClass?: string,
  saveButtonStyle?: string,
  saveButtonDisabledClass?: string,
  saveButtonsDisabledStyle?: string,
  undoButtonText?: string,
  undoButtonClass?: string,
  undoButtonStyle?: string,
  clearButtonText?: string,
  clearButtonClass?: string,
  clearButtonStyle?: string,
  textInputPlaceholder?: string,
  textInputClass?: string,
  textInputStyle?: string,
  canvasClass?: string,
  canvasStyle?: string,
  typeButtonsContainerClass?: string,
  typeButtonsContainerStyle?: string,
  drawTypeButtonText?: string,
  drawTypeButtonClass?: string,
  drawTypeButtonStyle?: string,
  drawTypeButtonActiveClass?: string,
  drawTypeButtonActiveStyle?: string,
  textTypeButtonText?: string,
  textTypeButtonClass?: string,
  textTypeButtonStyle?: string,
  textTypeButtonActiveClass?: string,
  textTypeButtonActiveStyle?: string,
  uploadTypeButtonText?: string,
  uploadTypeButtonClass?: string,
  uploadTypeButtonStyle?: string,
  uploadTypeButtonActiveClass?: string,
  uploadTypeButtonActiveStyle?: string,
  fontUrl?: string,
  className?: string,
  style?: React.CSSProperties,
  onSave?: (detail: any) => void,
  onChange?: (detail: any) => void
}
const SignatureMaker = ({
  downloadOnSave = false,
  withTyped = true,
  withDrawn = true,
  withUpload = true,
  withColorSelect = true,
  withSubmit = true,
  controlButtonsContainerClass = '',
  controlButtonsContainerStyle = '',
  saveButtonText = '',
  saveButtonClass = '',
  saveButtonStyle = '',
  saveButtonDisabledClass = '',
  saveButtonsDisabledStyle = '',
  undoButtonText = '',
  undoButtonClass = '',
  undoButtonStyle = '',
  clearButtonText = '',
  clearButtonClass = '',
  clearButtonStyle = '',
  textInputPlaceholder = '',
  textInputClass = '',
  textInputStyle = '',
  canvasClass = '',
  canvasStyle = '',
  typeButtonsContainerClass = '',
  typeButtonsContainerStyle = '',
  drawTypeButtonText = '',
  drawTypeButtonClass = '',
  drawTypeButtonStyle = '',
  drawTypeButtonActiveClass = '',
  drawTypeButtonActiveStyle = '',
  textTypeButtonText = '',
  textTypeButtonClass = '',
  textTypeButtonStyle = '',
  textTypeButtonActiveClass = '',
  textTypeButtonActiveStyle = '',
  uploadTypeButtonText = '',
  uploadTypeButtonClass = '',
  uploadTypeButtonStyle = '',
  uploadTypeButtonActiveClass = '',
  uploadTypeButtonActiveStyle = '',
  fontUrl = '',
  className = '',
  style = {},
  onSave = () => {},
  onChange = () => {}
}: SignatureMakerProps): JSX.Element => {
  if (typeof window === 'undefined') {
    return React.createElement('div', {}, 'SignatureMaker component is not supported on the server side')
  } else {
    const ref = React.useRef<HTMLElement>(null)

    React.useEffect(() => {
      const el = ref?.current

      const handleCompleted = (e: Event) => onSave && onSave((e as CustomEvent).detail)

      if (el) {
        el.addEventListener('save', handleCompleted)
      }

      return () => {
        if (el) {
          el.removeEventListener('save', handleCompleted)
        }
      }
    }, [onSave])

    React.useEffect(() => {
      const el = ref?.current

      const handleUpdate = (e: Event) => onChange && onChange((e as CustomEvent).detail)

      if (el) {
        el.addEventListener('change', handleUpdate)
      }

      return () => {
        if (el) {
          el.removeEventListener('change', handleUpdate)
        }
      }
    }, [onChange])

    return React.createElement('signature-maker', {
      'data-download-on-save': downloadOnSave,
      'data-with-typed': withTyped,
      'data-with-drawn': withDrawn,
      'data-with-upload': withUpload,
      'data-with-color-select': withColorSelect,
      'data-with-submit': withSubmit,
      'data-control-buttons-container-class': controlButtonsContainerClass,
      'data-control-buttons-container-style': controlButtonsContainerStyle,
      'data-save-button-text': saveButtonText,
      'data-save-button-class': saveButtonClass,
      'data-save-button-style': saveButtonStyle,
      'data-save-button-disabled-class': saveButtonDisabledClass,
      'data-save-button-disabled-style': saveButtonsDisabledStyle,
      'data-undo-button-text': undoButtonText,
      'data-undo-button-class': undoButtonClass,
      'data-undo-button-style': undoButtonStyle,
      'data-clear-button-text': clearButtonText,
      'data-clear-button-class': clearButtonClass,
      'data-clear-button-style': clearButtonStyle,
      'data-text-input-placeholder': textInputPlaceholder,
      'data-text-input-class': textInputClass,
      'data-text-input-style': textInputStyle,
      'data-canvas-class': canvasClass,
      'data-canvas-style': canvasStyle,
      'data-type-buttons-container-class': typeButtonsContainerClass,
      'data-type-buttons-container-style': typeButtonsContainerStyle,
      'data-draw-type-button-text': drawTypeButtonText,
      'data-draw-type-button-class': drawTypeButtonClass,
      'data-draw-type-button-style': drawTypeButtonStyle,
      'data-draw-type-button-active-class': drawTypeButtonActiveClass,
      'data-draw-type-button-active-style': drawTypeButtonActiveStyle,
      'data-text-type-button-text': textTypeButtonText,
      'data-text-type-button-class': textTypeButtonClass,
      'data-text-type-button-style': textTypeButtonStyle,
      'data-text-type-button-active-class': textTypeButtonActiveClass,
      'data-text-type-button-active-style': textTypeButtonActiveStyle,
      'data-upload-type-button-text': uploadTypeButtonText,
      'data-upload-type-button-class': uploadTypeButtonClass,
      'data-upload-type-button-style': uploadTypeButtonStyle,
      'data-upload-type-button-active-class': uploadTypeButtonActiveClass,
      'data-upload-type-button-active-style': uploadTypeButtonActiveStyle,
      'data-font-url': fontUrl,
      ref: ref,
      className,
      style
    })
  }
}

export default SignatureMaker
