export type TabType = {
    title: string
    icon: string
    active: string[]
    disabled: string[]
    inactive: string[]
}

export type TabsType = {
    [key: string]: TabType
}

export type PluginType = {
    title: string
    description: string
}

export type PluginsType = {
    [key: string]: PluginType
}

export type TabPluginType = {
    pluginKey: string
    tabKey: string
    disable: boolean
    status: boolean
}

export type TabPluginsType = {
    [key: string]: TabPluginType
}
