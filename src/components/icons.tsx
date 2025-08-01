import {
  AlertTriangle,
  ArchiveX,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightToLine,
  Bell,
  Bold,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDashed,
  CircleDot,
  CircleDotDashed,
  Clock,
  Code,
  Coffee,
  CreditCard,
  File,
  FileText,
  Flag,
  Flame,
  Hammer,
  Heading1,
  Heading2,
  Heading3,
  HelpCircle,
  History,
  IceCream,
  Image,
  Italic,
  Underline,
  Kanban,
  KanbanSquare,
  Laptop,
  Leaf,
  Loader2,
  LucideProps,
  Maximize2,
  Minimize2,
  Moon,
  MoreVertical,
  Pencil,
  Pizza,
  Plus,
  Ruler,
  SendHorizontal,
  Settings,
  Siren,
  Sprout,
  Strikethrough,
  SunMedium,
  Tag,
  TentTree,
  Text,
  Trash,
  UserCircle2,
  Weight,
  X,
  MoreHorizontal,
  AlignLeft,
  AlignRight,
  AlignCenter,
  AlignJustify,
  Baseline,
  List,
  ListOrdered,
  Heading4,
  Heading5,
  Pilcrow,
  Eye,
  EyeOff,
  Quote,
  BookOpen,
  TrendingUp,
} from "lucide-react";

export const Icons = {
  logo: "TrendingUp",
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  eye: Eye,
  eyeOff: EyeOff,
  add: Plus,
  warning: AlertTriangle,
  user: UserCircle2,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  kanban: Kanban,
  kanbanSquare: KanbanSquare,
  bookmark: Bookmark,
  blockquote: Quote,
  clock: Clock,
  check: Check,
  flag: Flag,
  bell: Bell,
  weight: Weight,
  maximize: Maximize2,
  minimize: Minimize2,
  ruler: Ruler,
  moreVertical: MoreVertical,
  archiveX: ArchiveX,
  history: History,
  circleDashed: CircleDashed,
  circleDotDashed: CircleDotDashed,
  circleDot: CircleDot,
  flame: Flame,
  siren: Siren,
  hammer: Hammer,
  iceCream: IceCream,
  sprout: Sprout,
  leaf: Leaf,
  tentTree: TentTree,
  coffee: Coffee,
  tag: Tag,
  plus: Plus,
  paragraph: Pilcrow,
  bookOpen: BookOpen,
  sendHorizontal: SendHorizontal,
  pencil: Pencil,
  bold: Bold,
  italic: Italic,
  underline: Underline,
  strikethrough: Strikethrough,
  alignLeft: AlignLeft,
  alignRight: AlignRight,
  alignCenter: AlignCenter,
  alignJustify: AlignJustify,
  baseline: Baseline,
  image: Image,
  code: Code,
  list: List,
  listOrdered: ListOrdered,
  text: Text,
  heading1: Heading1,
  heading2: Heading2,
  heading3: Heading3,
  heading4: Heading4,
  heading5: Heading5,
  arrowLeftToLine: ArrowLeftToLine,
  arrowRightToLine: ArrowRightToLine,
  moreHorizontal: MoreHorizontal,
  github: (props: LucideProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  linkedin: (props: LucideProps) => (
    <svg
      fill="currentColor"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 310 310"
      {...props}
    >
      <path
        id="XMLID_802_"
        d="M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73
		C77.16,101.969,74.922,99.73,72.16,99.73z"
      />
      <path
        id="XMLID_803_"
        d="M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4
		c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z"
      />
      <path
        id="XMLID_804_"
        d="M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599
		c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319
		c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995
		C310,145.43,300.549,94.761,230.454,94.761z"
      />
    </svg>
  ),
};
