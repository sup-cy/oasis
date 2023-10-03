import { HiLockClosed, HiLockOpen } from "react-icons/hi2";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useGetSettings } from "./useGetSettings";
import { useUpdateSettings } from "./useUpdateSettings";
import { useState } from "react";

function UpdateSettingsForm() {
  const { isLoading, settings } = useGetSettings();
  const { editSettings, isEditing } = useUpdateSettings();
  const [closeSet, setCloseSet] = useState(true);
  if (isLoading) return <Spinner />;
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;
  function handelUpdate(e, field) {
    const { value } = e.target;

    if (!value || settings[field] === Number(value)) return;
    editSettings({ [field]: value });
  }
  return (
    <>
      <Form>
        <FormRow>
          <Button
            size="small"
            variation="secondary"
            onClick={(e) => {
              e.preventDefault();
              setCloseSet((set) => !set);
            }}
          >
            {closeSet ? <HiLockClosed /> : <HiLockOpen />}
          </Button>
        </FormRow>
        <FormRow label="Minimum nights/booking">
          <Input
            type="number"
            id="min-nights"
            defaultValue={minBookingLength}
            disabled={isEditing || closeSet}
            onBlur={(e) => handelUpdate(e, "minBookingLength")}
          />
        </FormRow>
        <FormRow label="Maximum nights/booking">
          <Input
            type="number"
            id="max-nights"
            defaultValue={maxBookingLength}
            disabled={isEditing || closeSet}
            onBlur={(e) => handelUpdate(e, "maxBookingLength")}
          />
        </FormRow>
        <FormRow label="Maximum guests/booking">
          <Input
            type="number"
            id="max-guests"
            defaultValue={maxGuestsPerBooking}
            disabled={isEditing || closeSet}
            onBlur={(e) => handelUpdate(e, "maxGuestsPerBooking")}
          />
        </FormRow>
        <FormRow label="Breakfast price">
          <Input
            type="number"
            id="breakfast-price"
            defaultValue={breakfastPrice}
            disabled={isEditing || closeSet}
            onBlur={(e) => handelUpdate(e, "breakfastPrice")}
          />
        </FormRow>
      </Form>
    </>
  );
}

export default UpdateSettingsForm;
