import { XCircle } from "@phosphor-icons/react/dist/ssr/XCircle";
import ActionButton from "./modules/ActionButton";

export default function ActionButtonCancel({ disabled = false, ...attributes }) {
  return (
    <ActionButton {...attributes} disabled={disabled}>
      <XCircle
        size={32}
        className={`rounded-full ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-2 hover:bg-rose-600 hover:text-white'}`}
      />
    </ActionButton>
  );
}
