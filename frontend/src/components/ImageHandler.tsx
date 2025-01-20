import { useRef } from "react"


interface ImageHandlerType{
    imageVisualizer: (file: File)=> void;
}

const ImageHandler = ({imageVisualizer}:ImageHandlerType)=>{
    const imgref = useRef<HTMLInputElement>(null);

    const fileChangeHandler = (event:React.ChangeEvent<HTMLInputElement>)=>{
        const file = event.target.files?.[0];
        if(!file) return;

        if(!file.type.startsWith('image/')){
            console.log("only images are accepted");
            return;
        }
        if(file.size>5*1024*1024){
            console.log("Images file size should not exceed 5MB");
            return;
        }
        imageVisualizer(file);
        if (event.target) {
            event.target.value = "";
          }
    }

    return(
        <>
            <input
             type="file"
             accept="image/*"
             ref = {imgref}
             onChange={fileChangeHandler}
             className="hidden"
             />
            <button onClick={()=>imgref.current?.click()}>
                Image
            </button>
        </>
    )
}

export default ImageHandler;