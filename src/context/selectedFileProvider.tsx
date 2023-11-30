import { SelectedFileContext, SelectedFile } from './context'

type Props = {
  selectedFile: SelectedFile
  children: React.ReactNode
}

const SelectedFileProvider = ({ selectedFile, children }: Props) => {
  return <SelectedFileContext.Provider value={selectedFile}>{children}</SelectedFileContext.Provider>
}

export default SelectedFileProvider