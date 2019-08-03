import React from 'react';
import Editor from 'react-umeditor';
import './index.less'

export default class Umeditor extends React.Component {	
	getIcons(){
		var icons = [
			"source | undo redo | bold italic underline | ",
			"paragraph fontfamily fontsize | ",
			"forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | ",
			"cleardoc  | indent outdent | justifyleft justifycenter justifyright | ",
			"image emotion spechars | inserttable"
			// "source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
			// "paragraph fontfamily fontsize | superscript subscript | ",
			// "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
			// "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
			// "horizontal date time  | image emotion spechars | inserttable"
		]
		return icons;
	}
	getPlugins(){
		return {
			"image": { 
				"uploader": { 
					"name":"file", 
					"url": "/api/upload" 
				} 
			} 
		}
	}
	render() {
		var icons = this.getIcons();
		var plugins = this.getPlugins();
		return (<Editor ref="editor" 
			icons={icons}
			plugins={plugins}
			value={this.props.initialValue}
			onChange={this.props.onChange}
			/>)
	}
}