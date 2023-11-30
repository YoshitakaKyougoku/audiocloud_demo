import React from 'react'
import Button from '@mui/material/Button'
import { useRecoilValue } from 'recoil'
import { selectedFileState } from "@/context/selectedFileState"

export default function FileDownloader(){
    const fileName = useRecoilValue(selectedFileState)
    return(
        <>
            <Button variant='contained'  component='span' sx={{ height: 1 ,width: 1/5}}>
          DOWN
          <a href={`/${fileName}`} download>LOAD</a>
        </Button>
        </>
    )
}