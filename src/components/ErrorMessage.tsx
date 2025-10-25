import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

/**
 * ErrorMessage Component
 * Displays error messages with optional retry functionality
 * Provides user-friendly error feedback
 */
export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-4">
      <Alert className="max-w-md border-destructive/50 bg-destructive/10">
        <AlertCircle className="h-5 w-5 text-destructive" />
        <AlertTitle className="text-destructive">Error</AlertTitle>
        <AlertDescription className="mt-2 text-muted-foreground">
          {message}
        </AlertDescription>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="mt-4 border-destructive/50 hover:bg-destructive/20"
          >
            Try Again
          </Button>
        )}
      </Alert>
    </div>
  );
};
