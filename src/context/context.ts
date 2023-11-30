import { createContext } from 'react'
export type SelectedFile = {
    name: string
}
export const SelectedFileContext = createContext<SelectedFile>({ name: ''})