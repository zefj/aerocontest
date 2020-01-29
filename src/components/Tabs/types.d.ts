type TabIndex = string;

type Tab<T extends TabIndex> = {
    index: T,
    name: string,
};

type TabsProps<T extends TabIndex> = {
    tabs: Tab<T>[],
    active: T,
    setTab: (arg: T) => void
};