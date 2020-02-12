type TabIndex = string;

type Tab<T extends TabIndex> = {
    index: T,
    name: string,
    path: string,
    match?: string,
};

type TabsProps<T extends TabIndex> = {
    tabs: Tab<T>[],
};
