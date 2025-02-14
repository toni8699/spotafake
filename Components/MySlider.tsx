"use client "

import * as Slider from '@radix-ui/react-slider'

interface SliderProps {
    value?: number;
    onChange?: (value: number) => void;
}
const MySlider: React.FC<SliderProps> = ({
    value = 1,
    onChange
}) => {
    const onValueChange = (newValue: number[]) => {
        onChange?.(newValue[0])
    }
    return (
        <Slider.Root
            className="relative flex w-full touch-none select-none items-center"
            value={[value]}
            onValueChange={onValueChange}
            max={1}
            defaultValue={[0.5]}
            step={0.1}
            aria-label="Volume"
        >
            <Slider.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-secondary">
                <Slider.Range className="absolute h-full bg-white" />
            </Slider.Track>
            <Slider.Thumb className="block h-3 w-3 rounded-full bg-white shadow focus:outline-none" />
        </Slider.Root>

    )
}

export default MySlider