var app={
	layerData:[],
	kmlCacheData:[],
	makeConversion:function(){
		var data=JSON.parse(jsdata),
		layers=data[1][6];
		
		for(var i=0;i<layers.length;i++){
			var aLayer=layers[i];
			var lName=aLayer[2];
			var features=[];
			var lAttrs=aLayer[12][0][13][0];

			for(var c=0;c<lAttrs.length;c++){
				var o={
					id:lAttrs[c][0],
					long:lAttrs[c][1][0][0][0],
					lat:lAttrs[c][1][0][0][1],
					name:lAttrs[c][5][0][1][0],
					end:(lAttrs[c][5][3][0]==undefined)?(''):(lAttrs[c][5][3][0][1][0]),
					desc:(lAttrs[c][5][3][1]==undefined)?((lAttrs[c][5][1][1]==undefined)?(''):(lAttrs[c][5][1][1][0])):(lAttrs[c][5][3][1][1][0])
				};
				o.name=app.removeSpecialChars(o.name);
				o.end=app.removeSpecialChars(o.end);
				o.desc=app.removeSpecialChars(o.desc);
				features.push(o);
			}
			app.layerData.push({name:lName,features:features});
		}
		this.makeKML();
	},
	makeKML:function(){
		var kml='';

		for(var c=0;c<app.layerData.length;c++){
			var txa = document.createElement("TEXTAREA");
			var kmlHeader='<?xml version="1.0" encoding="UTF-8"?>\n'+
				'<kml xmlns="http://www.opengis.net/kml/2.2">\n'+
				' <Document>\n'+
				'    <name>'+app.removeSpecialChars(app.layerData[c].name)+'</name>\n'+
				'   <Style id="icon-1899-0288D1-normal">\n'+
				'     <IconStyle>\n'+
				'      <color>ffd18802</color>\n'+
				'       <scale>1</scale>\n'+
				'      <Icon>\n'+
				'         <href>http://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png</href>\n'+
				'       </Icon>\n'+
				'       <hotSpot x="16" xunits="pixels" y="32" yunits="insetPixels"/>\n'+
				'     </IconStyle>\n'+
				'     <LabelStyle>\n'+
				'       <scale>0</scale>\n'+
				'     </LabelStyle>\n'+
				'   </Style>\n'+
				'   <Style id="icon-1899-0288D1-highlight">\n'+
				'     <IconStyle>\n'+
				'       <color>ffd18802</color>\n'+
				'       <scale>1</scale>\n'+
				'       <Icon>\n'+
				'          <href>http://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png</href>\n'+
				'        </Icon>\n'+
				'        <hotSpot x="16" xunits="pixels" y="32" yunits="insetPixels"/>\n'+
				'      </IconStyle>\n'+
				'      <LabelStyle>\n'+
				'        <scale>1</scale>\n'+
				'      </LabelStyle>\n'+
				'    </Style>\n'+
				'    <StyleMap id="icon-1899-0288D1">\n'+
				'     <Pair>\n'+
				'        <key>normal</key>\n'+
				'        <styleUrl>#icon-1899-0288D1-normal</styleUrl>\n'+
				'      </Pair>\n'+
				'      <Pair>\n'+
				'        <key>highlight</key>\n'+
				'        <styleUrl>#icon-1899-0288D1-highlight</styleUrl>\n'+
				'      </Pair>\n'+
				'    </StyleMap>\n';

			for(var d=0;d<app.layerData[c].features.length;d++){
				var features=app.layerData[c].features[d];
				
				kml+='<Placemark>\n'+
				'<name>'+features.name+'</name>\n'+
				//'<address>'+features.end+'</address>\n'+
				'<description><![CDATA['+features.desc+']]></description>\n';

// 				'<styleUrl>#icon-1899-0288D1</styleUrl>\n'+
// 				'<ExtendedData>\n'+
// 				'<Data name="endereço">\n'+
// 				'<value>'+features.end+'</value>\n'+
// 				'</Data>\n'+
// 				'<Data name="descrição">\n'+
// 				'<value>'+features.desc+'</value>\n'+
// 				'</Data>\n'+
// 				'</ExtendedData>';

				kml+='<Point>\n'+
				'<coordinates>'+features.lat+','+features.long+'</coordinates>\n'+
				'</Point>\n';
				kml+='</Placemark>\n';
			}

			var kmlFooter='</Document>\n'+
			'</kml>';

			app.kmlCacheData.push(kmlHeader+kml+kmlFooter);

			app.createButton( app.layerData[c].name, (app.kmlCacheData.length-1) );

			kml='';
		}
	},
	removeSpecialChars:function(str) {
		str = str.replace(/[áàãâä]/gi, 'a');
        str = str.replace(/[éèêë]/gi, 'e');
        str = str.replace(/[íìîï]/gi, 'i');
        str = str.replace(/[óòõôö]/gi, 'o');
        str = str.replace(/[úùûü]/gi, 'u');
        str = str.replace(/[ç]/gi, 'c');
        return str;
	},
	createButton:function(layerName,id){
		var btn = document.createElement("BUTTON");
		var t = document.createTextNode(layerName);
		btn.appendChild(t);
		btn.onclick = function(){app.downloadKml(layerName,id);};
		
		var kmlWindow=document.getElementById("kml");
		kmlWindow.appendChild(btn);
		var hr = document.createElement("HR");
		kmlWindow.appendChild(hr);
	},
	downloadKml:function(fileName,id){
		var k=app.kmlCacheData[id];
		var file = new File([k], fileName+".kml", {type: "text/plain;charset=utf-8"});
			saveAs(file);
	}
};