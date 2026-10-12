'use client';

import * as Select from '@radix-ui/react-select';

type Option = { value: string; label: string };
type Props = { id?: string; label: string; value: string; onValueChange: (value: string) => void; options: readonly Option[] };

function Chevron({ up = false }: { up?: boolean }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={up ? 'm6 15 6-6 6 6' : 'm6 9 6 6 6-6'} /></svg>;
}

export default function SelectField({ id, label, value, onValueChange, options }: Props) {
  return <Select.Root value={value} onValueChange={onValueChange}>
    <Select.Trigger id={id} className="select-trigger" aria-label={label}>
      <Select.Value>{options.find((option) => option.value === value)?.label}</Select.Value>
      <Select.Icon className="select-icon"><Chevron /></Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="select-content" position="popper" sideOffset={6} collisionPadding={12}>
        <Select.ScrollUpButton className="select-scroll"><Chevron up /></Select.ScrollUpButton>
        <Select.Viewport className="select-options">
          {options.map((option) => <Select.Item className="select-option" value={option.value} key={option.value}>
            <Select.ItemText>{option.label}</Select.ItemText>
            <Select.ItemIndicator className="select-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg></Select.ItemIndicator>
          </Select.Item>)}
        </Select.Viewport>
        <Select.ScrollDownButton className="select-scroll"><Chevron /></Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>;
}
