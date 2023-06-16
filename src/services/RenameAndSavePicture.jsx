import * as FileSystem from 'expo-file-system'

export const renameAndSavePicture = async (originalPath) => {
    if (originalPath !== "") {
        const fileName = originalPath.split('/').pop()
        const newPath = FileSystem.documentDirectory + fileName
        await FileSystem.moveAsync(
            {
                from: originalPath,
                to: newPath
            }
        )
        return newPath
    } else { return originalPath }
}

export const deletePictureInFileSystem = async (path) => {
    if (path != "") {
        await FileSystem.deleteAsync(path)
    }
}