import React, { useCallback, useRef } from 'react'

import { toJpeg } from 'html-to-image';
import { Focus } from 'lucide-react';

const ScreenShotTaker = ({ currentRef, imgName }: { currentRef: any, imgName: string}) => {
    const onButtonClick = useCallback(() => {
        if (currentRef.current === null) {
          return
        }
        
        toJpeg(currentRef.current, { cacheBust: true, quality: 1.0 })
          .then((dataUrl) => {
            const link: any = document.createElement('a')
            link.download = `${imgName}.jpeg`
            link.href = dataUrl
            link.click()
          })
          .catch((err) => {
            console.log(err)
          })
      }, [currentRef, imgName])
    return (
        <div className="flex items-center space-x-2 p-1 bg-black cursor-pointer text-gray-500 border-2 border-gray-500 rounded-md w-fit font-semibold" onClick={onButtonClick}>
          <Focus className="w-6 h-6"/>
            <p>Take Screen Shot</p>
        </div>
    )
}

export default ScreenShotTaker
