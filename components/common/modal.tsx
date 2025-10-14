import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ModalProps {
  trigger?: React.ReactNode
  title?: string
  description?: string
  cancelText?: string
  actionText?: string
  onAction?: () => void
  onCancel?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  showCancel?: boolean
  variant?: "default" | "destructive"
}

export default function Modal({
  trigger = "Open",
  title = "Are you absolutely sure?",
  description = "This action cannot be undone.",
  cancelText = "Cancel",
  actionText = "Continue",
  onAction,
  onCancel,
  open,
  onOpenChange,
  showCancel = true,
  variant = "default",
}: ModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild={typeof trigger !== 'string'}>
        {typeof trigger === 'string' ? <button>{trigger}</button> : trigger}
      </AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {showCancel && (
            <AlertDialogCancel onClick={onCancel}>
              {cancelText}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={onAction}
            className={variant === "destructive" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}