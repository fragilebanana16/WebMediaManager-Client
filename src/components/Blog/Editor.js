import ReactQuill from "react-quill";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";

export default function Editor({value,onChange}) {
  const theme = useTheme();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };
  return (
    <Container>
    <div className="content">
    <ReactQuill
    style={{height:'530px'}}
      value={value}
      theme={'snow'}
      onChange={onChange}
      modules={modules} 
      />
    </div>
    </Container>

  );
}

const Container = styled.div`
.ql-editor{
  ${'' /* overflow: "hidden";
  overflow-y:'auto'; */}
  ${'' /* scrollbar-color:#888 #00f5f5; */}
  ${'' /* scrollbar-width: thin;
  height: "100%";
            position: "relative";
            flexGrow: 1;
            overflow: "hidden";
            overflowY: "scroll"; */}
}

.ql-editor::-webkit-scrollbar{
  width: 10px;;
}

.ql-editor::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}

.ql-editor::-webkit-scrollbar-thumb{
  background-color: #8885;
  border-radius: 20px;
}

.ql-editor::-webkit-scrollbar-thumb:hover{
  background-color: #888;
}

.content{
  ${'' /* background-color: coral; */}
  ${'' /* toolbar height 42px*/}
  padding-bottom: calc(42px + 10px); 
`;