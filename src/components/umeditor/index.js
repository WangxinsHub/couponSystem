import React from 'react';
import Editor from 'react-umeditor';
import url from '@/api/url';

export default class Umeditor extends React.Component {
	constructor(props){
        super(props)
		this.state = {
			content: this.props.initialValue
		}
	}
	handleChange =(content) => {
		this.setState({
			content: content
		})
		this.props.getUmEditorValue(content)
	}
	getIcons(){
		var icons = [
      "source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
      "paragraph fontfamily fontsize | superscript subscript | ",
      "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
      "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
      "horizontal date time  | image emotion spechars | inserttable"
		]
		return icons;
	}
	

	render() {
		var icons = this.getIcons();
		var plugins = {
			image:{
				uploader:{
					url: url.uploadAnnoucementImage,
					name:"file",
					filter:(res)=> res.data
				}
			}
		}
		return (<Editor ref="editor" 
			icons={icons}
			plugins={plugins}
			value={this.state.content}
			onChange={this.handleChange}/>)
	}
}