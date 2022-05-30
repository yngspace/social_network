interface DefaultInputProps {
  placeholder: string
  modelValue: string
  onValueChange: (v: string) => void
  type?: 'text'|'password'
  error?: string
  maxLength?: number
  className?: string
}

export const DefaultInput =
({
  modelValue,
  onValueChange,
  type,
  error,
  placeholder,
  maxLength,
  className
}: DefaultInputProps) => {
  return (
    <label class={{
      'default-input': true,
      'not-empty': modelValue.length,
      'with-error': error?.length,
      'with-lenght-limit': maxLength,
      className
    }}>
      <span class='default-input-placeholder'>{placeholder}</span>
      <input
        type={type || 'text'}
        value={modelValue}
        onInput={(e: any) => { onValueChange(e.target?.value) }}
        maxlength={maxLength}
      />
      {error && <span class='default-input-error'>{error}</span>}
      {maxLength && <div class='length-counter'>
        <span>{`${modelValue.length}/${maxLength}`}</span>
      </div>}
    </label>
  )
}
