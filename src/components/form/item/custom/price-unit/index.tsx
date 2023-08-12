import { useState } from 'react';
import { Input, Select } from 'antd';

type Unit = 'rmb' | 'dollar';

interface PriceValue {
  number?: number;
  unit?: Unit;
}

interface PriceUnitProps {
  value?: PriceValue;
  onChange?: (value: PriceValue) => void;
}

const PriceUnit: React.FC<PriceUnitProps> = ({ value = {}, onChange }: PriceUnitProps) => {
  const [number, setNumber] = useState(0);
  const [unit, setUnit] = useState<Unit>('rmb');

  const triggerChange = (changedValue: { number?: number; unit?: Unit }) => {
    onChange?.({ number, unit, ...value, ...changedValue });
  };

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!('number' in value)) {
      setNumber(newNumber);
    }
    triggerChange({ number: newNumber });
  };

  const onUnitChange = (newUnit: Unit) => {
    if (!('unit' in value)) {
      setUnit(newUnit);
    }
    triggerChange({ unit: newUnit });
  };

  return (
    <>
      <Input
        type="text"
        value={value.number || number}
        onChange={onNumberChange}
        addonAfter={
          <Select
            value={value.unit || unit}
            onChange={onUnitChange}
            options={[
              { label: 'RMB', value: 'rmb' },
              { label: 'Dollar', value: 'dollar' },
            ]}
          />
        }
      />
    </>
  );
};

export default PriceUnit;
