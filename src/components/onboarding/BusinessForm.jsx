import { useState } from 'react'
import StepIndicator from './StepIndicator'
import Button from '../ui/Button'
import Input from '../ui/Input'

const STEPS = [
  {
    id: 'name',
    title: "What's your business called?",
    subtitle: "Enter the name your customers know you by.",
  },
  {
    id: 'address',
    title: 'Where are you based?',
    subtitle: "Your street address helps us check your listings on each platform.",
  },
  {
    id: 'contact',
    title: 'How can customers reach you?',
    subtitle: "Add your phone number and website so we can check how complete your listings are.",
  },
]

function validate(step, values) {
  const errors = {}
  if (step === 0 && !values.name.trim()) errors.name = 'Please enter your business name.'
  if (step === 1 && !values.address.trim()) errors.address = 'Please enter your address.'
  if (step === 2 && !values.phone.trim()) errors.phone = 'Please enter your phone number.'
  return errors
}

export default function BusinessForm({ onComplete }) {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState({ name: '', address: '', phone: '', website: '' })
  const [errors, setErrors] = useState({})

  function set(field, val) {
    setValues(v => ({ ...v, [field]: val }))
    setErrors(e => ({ ...e, [field]: undefined }))
  }

  function next() {
    const errs = validate(step, values)
    if (Object.keys(errs).length) { setErrors(errs); return }
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else onComplete(values)
  }

  function back() {
    setStep(s => s - 1)
    setErrors({})
  }

  const current = STEPS[step]

  return (
    <div className="w-full max-w-lg mx-auto">
      <StepIndicator currentStep={step} totalSteps={STEPS.length} />

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{current.title}</h2>
        <p className="text-gray-500">{current.subtitle}</p>
      </div>

      <div className="space-y-4">
        {step === 0 && (
          <Input
            label="Business name"
            id="name"
            value={values.name}
            onChange={e => set('name', e.target.value)}
            onKeyDown={e => e.key === 'Enter' && next()}
            placeholder="e.g. Smith Electrical"
            error={errors.name}
            autoFocus
          />
        )}

        {step === 1 && (
          <Input
            label="Street address"
            id="address"
            value={values.address}
            onChange={e => set('address', e.target.value)}
            onKeyDown={e => e.key === 'Enter' && next()}
            placeholder="e.g. 12 Main St, Brisbane QLD 4000"
            error={errors.address}
            hint="Include your suburb and state."
            autoFocus
          />
        )}

        {step === 2 && (
          <>
            <Input
              label="Phone number"
              id="phone"
              type="tel"
              value={values.phone}
              onChange={e => set('phone', e.target.value)}
              onKeyDown={e => e.key === 'Enter' && next()}
              placeholder="e.g. 0412 345 678"
              error={errors.phone}
              autoFocus
            />
            <Input
              label="Website (optional)"
              id="website"
              type="url"
              value={values.website}
              onChange={e => set('website', e.target.value)}
              onKeyDown={e => e.key === 'Enter' && next()}
              placeholder="e.g. https://smithelectrical.com.au"
              hint="Don't have one? Leave this blank."
            />
          </>
        )}
      </div>

      <div className="flex gap-3 mt-8">
        {step > 0 && (
          <Button variant="secondary" onClick={back} className="flex-1">
            Back
          </Button>
        )}
        <Button onClick={next} className="flex-1">
          {step < STEPS.length - 1 ? 'Next' : 'Find My Business'}
        </Button>
      </div>
    </div>
  )
}
