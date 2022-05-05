export type plugin = {
    title: string
    description: string
}

export type plugins = {
    [key: string]: plugin
}

export type tab = {
    title: string
    icon: string
    active: string[]
    disabled: string[]
    inactive: string[]
}

export type tabs = {
    [key: string]: tab
}
