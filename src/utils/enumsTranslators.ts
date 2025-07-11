export const getStatusInfo = (status: number) => {
    switch (status) {
        case 0:
            return { label: "Создан", color: "var(--mantine-color-yellow-6)" };
           
        case 1:
            return { label: "Принят", color: "var(--mantine-color-yellow-6)" };
        case 2:
            
            return { label: "В пути", color: "var(--mantine-color-yellow-6)" };
        case 3:
           
            return { label: "Доставлен", color: "var(--mantine-color-green-6)" };
        case 4:
            return { label: "Отменен", color: "var(--mantine-color-red-6)" };
        default:
            return { label: "Неизвестно", color: "var(--mantine-color-gray-6)" };
    }
};

export const getOptionLabel = (option: string) => {
    switch (option) {
      case "DEFAULT":
        return "Обычная доставка";
      case "EXPRESS":
        return "Экспресс доставка";
      default:
        return option;
    }
  };