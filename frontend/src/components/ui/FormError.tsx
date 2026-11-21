interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <p role="alert" className="text-xs text-red-600 font-medium">
      {message}
    </p>
  );
}