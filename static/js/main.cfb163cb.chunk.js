(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{104:function(e,t,a){},108:function(e,t,a){},115:function(e,t,a){e.exports=a.p+"static/media/3_lip_2020_19_43_42_1593804563614.5af8c9e5.gpx"},118:function(e,t,a){e.exports=a.p+"static/media/WOJTEK.04601a8c.kml"},179:function(e,t,a){},182:function(e,t,a){"use strict";a.r(t);var n,r=a(0),o=a.n(r),l=a(40),c=a.n(l),i=(a(104),a(11)),u=a(2),s=a.n(u),m=(a(105),a(106),a(78)),d=a(38),f=a(188),p=a(184),g=a(187),y=a(185),v=a(186),b=(a(108),a(16)),E=(a(109),a(80)),h=a.n(E),O=a(81),j=a.n(O),w=a(82),k=a.n(w),x={weight:3,color:"#2c83cb",lineCap:"butt"},C={color:"#06CB13"},S={color:"#cb123d"},L={color:"#999999",dashArray:"3, 3"},z={weight:10},R=a(4),A=a(32),D=a(54),F=a(5),T=a(8),_=a(189),B=a(85),I=function(e,t){return{id:Object(_.a)(),name:e,content:t}},P={entries:{},analysis:{},selected:null},G=function(e){return e.routes.entries},M=function(e){return e.routes.analysis},N=function(e){return e.routes.selected},U=Object(B.a)(M,(function(e){return e.routes.selected}),(function(e,t){if(t)for(var a=0,n=Object.values(e);a<n.length;a++){var r=n[a];if(r){var o=r.find((function(e){return e.id===t.id}));if(o)return o}}})),W=a(86),H=a.n(W),K=a(87),V=a.n(K),Y=a(37),J=function(e){var t=e.getLayers()[0].getLayers(),a=!0,n=!1,r=void 0;try{for(var o,l=t[Symbol.iterator]();!(a=(o=l.next()).done);a=!0){var c=o.value;if(c instanceof s.a.Polyline)return c}}catch(i){n=!0,r=i}finally{try{a||null==l.return||l.return()}finally{if(n)throw r}}return null},X=function e(t,a){for(var n,r=a.getLayers(),o=0;o<r.length;o++){var l=r[o],c=!1;if(l instanceof s.a.FeatureGroup&&(c=e(t,l)),l instanceof s.a.Path){var i=Object(Y.point)([t.lng,t.lat]),u=(n=l)instanceof s.a.Circle?V()(n.toGeoJSON().geometry.coordinates,n.getRadius(),{steps:10,units:"meters"}):n instanceof s.a.Polygon?n.toGeoJSON():n instanceof s.a.Polyline?new s.a.Polygon(n.getLatLngs()).toGeoJSON():null;if(null===u)continue;c=H()(i,u)}if(c)return c}return!1},Z=function(e,t){for(var a=e.getLatLngs(),n=[],r=0;r<a.length;r++){var o=a[r],l=a[r+1],c=l?(null===l||void 0===l?void 0:l.meta.time.valueOf())-o.meta.time.valueOf():0,i=X(o,t),u=n[n.length-1];if(u||(u={id:Object(_.a)(),type:i?"ontrack":"offtrack",latLngs:[]},n.push(u)),c>1e4){u.latLngs.push(o);var s={id:Object(_.a)(),type:"unknown",latLngs:[]};n.push(s),s.latLngs.push(o)}else if(i){var m=u;"offtrack"!==u.type&&"unknown"!==u.type||(u.latLngs.push(o),m={id:Object(_.a)(),type:"ontrack",latLngs:[]},n.push(m)),m.latLngs.push(o)}else{var d=u;"ontrack"!==u.type&&"unknown"!==u.type||(u.latLngs.push(o),d={id:Object(_.a)(),type:"offtrack",latLngs:[]},n.push(d)),d.latLngs.push(o)}}return n.filter((function(e){return e.latLngs.length>0}))},q=function(e,t){return{type:"ADD_ROUTE",payload:{name:e,content:t}}},Q=function(e,t){return function(a,n){var r=n(),o=function(e,t,a){console.log("Running analysis...");var n={};if(0===a.getLayers().length)return n;for(var r=0,o=Object.entries(e);r<o.length;r++){var l=Object(i.a)(o[r],2)[1],c=t[l.id];if(null===c||void 0===c?void 0:c.gpx){var u=J(c.gpx);if(!u)throw new Error("Polyline layer not found in route.");var s=Z(u,a);n=Object(T.a)({},n,Object(F.a)({},l.id,s))}}return n}(G(r),e,t);a($(o))}},$=function(e){return{type:"ROUTES_ANALYSED",payload:{analyses:e}}},ee=function(e,t,a){return{type:"OVERRIDE_ANALYSIS",payload:{id:e,analysisId:t,type:a}}},te=a(26),ae=a(88),ne=a(89),re={content:""},oe=function(e){return e.track},le=Object(te.combineReducers)({routes:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"ADD_ROUTE":var n=I(a.payload.name,a.payload.content);return Object(T.a)({},t,{entries:Object(T.a)({},t.entries,Object(F.a)({},n.id,n))});case"REMOVE_ROUTE":var r=t.entries,o=a.payload.id,l=(r[o],Object(A.a)(r,[o].map(D.a))),c=t.analysis,i=a.payload.id,u=(c[i],Object(A.a)(c,[i].map(D.a)));return Object(T.a)({},t,{entries:l,analysis:u});case"ROUTE_PARSED":return Object(T.a)({},t,{entries:Object(T.a)({},t.entries,Object(F.a)({},a.payload.id,Object(T.a)({},t.entries[a.payload.id])))});case"ROUTE_ANALYSED":return Object(T.a)({},t,{analysis:Object(T.a)({},t.analysis,Object(F.a)({},a.payload.id,a.payload.analysis))});case"ROUTES_ANALYSED":return Object(T.a)({},t,{analysis:a.payload.analyses,selected:null});case"CHANGE_ROUTE_NAME":return Object(T.a)({},t,{entries:Object(T.a)({},t.entries,Object(F.a)({},a.payload.id,Object(T.a)({},t.entries[a.payload.id],{name:a.payload.name})))});case"SELECT_POLYLINE":return a.payload.id?Object(T.a)({},t,{selected:{id:a.payload.id,analysis_id:a.payload.analysisId}}):Object(T.a)({},t,{selected:null});case"OVERRIDE_ANALYSIS":return Object(T.a)({},t,{analysis:Object(T.a)({},t.analysis,Object(F.a)({},a.payload.analysisId,null===(e=t.analysis[a.payload.analysisId])||void 0===e?void 0:e.map((function(e){return e.id===a.payload.id?Object(T.a)({},e,{type:a.payload.type}):e}))))});default:return t}},track:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:re,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOAD_TRACK":return Object(T.a)({},e,{content:t.payload.content});default:return e}}}),ce=o.a.createContext({layers:{},trackLayer:new s.a.FeatureGroup,setGpx:function(){}}),ie=(a(115),{gpx_options:{joinTrackSegments:!0},marker_options:{startIconUrl:h.a,endIconUrl:j.a,shadowUrl:k.a},polyline_options:x}),ue=function(){var e=Object(b.b)().map,t=Object(R.c)(G),a=Object(r.useContext)(ce),n=a.layers,o=a.setGpx,l=Object(R.b)();return Object(r.useEffect)((function(){0}),[l]),Object(r.useEffect)((function(){e&&t&&(Object.entries(t).forEach((function(t){var a=Object(i.a)(t,2),r=(a[0],a[1]),c=n[r.id];if(c&&!c.gpx){var u=new s.a.GPX(r.content,ie);o(r.id,u),l({type:"ROUTE_PARSED",payload:{id:r.id}}),u.addTo(c.layers),c.layers.addTo(e)}})),Object.entries(n).forEach((function(e){var a=Object(i.a)(e,2),n=a[0],r=a[1];t[n]||r.layers.remove()})))}),[e,t,n,o,l]),Object(r.useEffect)((function(){if(e){var a=function(e,t){return Object.values(e).reduce((function(e,a){var n=t[a.id];return n&&n.gpx?e?e.extend(n.gpx.getBounds()):n.gpx.getBounds():e}),null)}(t,n);a&&e.fitBounds(a)}}),[n,e,t]),null},se=(a(116),function(e){var t=e.drawingMode,a=void 0!==t&&t,o=Object(b.b)().map,l=Object(r.useContext)(ce).trackLayer;return Object(r.useEffect)((function(){var e={position:"topleft",draw:{polyline:!1,marker:!1,circlemarker:!1},edit:{edit:!1,featureGroup:l}};n=new s.a.Control.Draw(e)}),[o,l]),Object(r.useEffect)((function(){o&&o.addLayer(l)}),[o,l]),Object(r.useEffect)((function(){o&&n&&(a?o.addControl(n):o.removeControl(n))}),[o,a]),Object(r.useEffect)((function(){o&&o.on(s.a.Draw.Event.CREATED,(function(e){var t=e.layer;l.addLayer(t)}))}),[o,l]),null}),me=function(){var e=Object(R.b)(),t=Object(b.b)().map,a=Object(r.useContext)(ce),n=a.layers,o=a.trackLayer,l=Object(r.useCallback)((function(){e(Q(n,o))}),[n,o]);return Object(r.useEffect)((function(){return function(e,t){if(e){console.log("Registering leaflet event listeners...");var a=function(e){return t()};return e.on(s.a.Draw.Event.CREATED,a),e.on(s.a.Draw.Event.EDITED,a),e.on(s.a.Draw.Event.DELETED,a),e.on("TRACK_LOADED",a),function(){e.off(s.a.Draw.Event.CREATED,a),e.off(s.a.Draw.Event.EDITED,a),e.off(s.a.Draw.Event.DELETED,a),e.off("TRACK_LOADED",a)}}}(t,l)}),[l]),Object(r.useEffect)((function(){e(Q(n,o))}),[l]),null},de=function(e,t,a,n,r){t.offtrackMarkersLayer.clearLayers(),t.offtrackFragmentsLayer.clearLayers(),t.ontrackMarkersLayer.clearLayers(),t.ontrackFragmentsLayer.clearLayers(),a.forEach((function(a){var o=Object(T.a)({},x,{},function(e){switch(e){case"ontrack":return C;case"offtrack":return S;default:return L}}(a.type),{},(null===n||void 0===n?void 0:n.id)===a.id?z:{}),l=s.a.polyline(a.latLngs,o);l.on("click",(function(t){r(a.id,e)})).on("mouseover",(function(e){l.setStyle(Object(T.a)({},o,{},z))})).on("mouseout",(function(e){l.setStyle(o)})).addTo(t.offtrackFragmentsLayer)}))},fe=function(){var e=Object(b.b)().map,t=Object(R.c)(M),a=Object(r.useContext)(ce).layers,n=Object(R.c)(G),o=!Object.keys(t).length,l=Object(R.b)(),c=Object(r.useCallback)((function(e,t){return l(function(e,t){return{type:"SELECT_POLYLINE",payload:{id:e,analysisId:t}}}(e,t))}),[l]),u=Object(R.c)(N);return Object(r.useEffect)((function(){if(e)for(var r=0,l=Object.entries(n);r<l.length;r++){var s=Object(i.a)(l[r],2),m=s[0],d=s[1],f=a[d.id];if(null===f||void 0===f?void 0:f.gpx){var p=J(f.gpx);if(!p)throw new Error("Polyline layer not found in route.");o||e.removeLayer(p),o&&!e.hasLayer(p)&&e.addLayer(p);var g=t[m]||[];de(m,f,g,u,c)}}}),[e,t,u,n,a,o,c]),null},pe=(a(117),function(e){return{type:"LOAD_TRACK",payload:{content:e}}}),ge=(a(118),function(){var e=Object(b.b)().map,t=Object(R.b)(),a=Object(r.useContext)(ce).trackLayer,n=Object(R.c)(oe);return Object(r.useEffect)((function(){0}),[t]),Object(r.useEffect)((function(){if(e&&(null===n||void 0===n?void 0:n.content)){var t=(new DOMParser).parseFromString(n.content,"text/xml");new s.a.KML(t).getLayers()[0].getLayers().forEach((function(e){return a.addLayer(e)})),e.fireEvent("TRACK_LOADED")}}),[e,n,a]),null}),ye=function(){var e=Object(r.useState)({lat:51.505,lng:-.09}),t=Object(i.a)(e,1)[0],a=Object(r.useState)(13),n=Object(i.a)(a,1)[0];return o.a.createElement("div",{className:"map-container"},o.a.createElement(f.a,{center:t,zoom:n,zoomControl:!1,preferCanvas:!1},o.a.createElement(p.a,{position:"topright"},o.a.createElement(p.a.BaseLayer,{checked:!0,name:"Mapa"},o.a.createElement(g.a,{attribution:'&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"})),o.a.createElement(p.a.BaseLayer,{name:"Satelita"},o.a.createElement(g.a,{attribution:"Tiles \xa9 Esri \u2014 Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"})),o.a.createElement(p.a.BaseLayer,{name:"Bez mapy"},o.a.createElement(g.a,{url:""}))),o.a.createElement(y.a,{position:"topleft"}),o.a.createElement(v.a,{position:"bottomleft",imperial:!1}),o.a.createElement(me,null),o.a.createElement(ue,null),o.a.createElement(ge,null),o.a.createElement(se,{drawingMode:!0}),o.a.createElement(fe,null)))},ve=a(90),be=a.n(ve),Ee=a(24),he=a(1),Oe={"light-blue-050":"#EBF8FF","light-blue-100":"#D1EEFC","light-blue-200":"#A7D8F0","light-blue-300":"#7CC1E4","light-blue-400":"#55AAD4","light-blue-500":"#3994C1","light-blue-600":"#2D83AE","light-blue-700":"#1D6F98","light-blue-800":"#166086","light-blue-900":"#0B4F71","green-050":"#E3F9E5","green-100":"#C1EAC5","green-200":"#A3D9A5","green-300":"#7BC47F","green-400":"#57AE5B","green-500":"#3F9142","green-600":"#2F8132","green-700":"#207227","green-800":"#0E5814","green-900":"#05400A","cool-grey-050":"#F5F7FA","cool-grey-100":"#E4E7EB","cool-grey-200":"#CBD2D9","cool-grey-300":"#9AA5B1","cool-grey-400":"#7B8794","cool-grey-500":"#616E7C","cool-grey-600":"#52606D","cool-grey-700":"#3E4C59","cool-grey-800":"#323F4B","cool-grey-900":"#1F2933","purple-050":"#EAE2F8","purple-100":"#CFBCF2","purple-200":"#A081D9","purple-300":"#8662C7","purple-400":"#724BB7","purple-500":"#653CAD","purple-600":"#51279B","purple-700":"#421987","purple-800":"#34126F","purple-900":"#240754","red-050":"#FFEEEE","red-100":"#FACDCD","red-200":"#F29B9B","red-300":"#E66A6A","red-400":"#D64545","red-500":"#BA2525","red-600":"#A61B1B","red-700":"#911111","red-800":"#780A0A","red-900":"#610404","yellow-050":"#FFFAEB","yellow-100":"#FCEFC7","yellow-200":"#F8E3A3","yellow-300":"#F9DA8B","yellow-400":"#F7D070","yellow-500":"#E9B949","yellow-600":"#C99A2E","yellow-700":"#A27C1A","yellow-800":"#7C5E10","yellow-900":"#513C06"},je={body:"14px",12:"".concat(.75,"rem"),14:"".concat(.875,"rem"),16:"".concat(1,"rem"),18:"".concat(1.125,"rem"),20:"".concat(1.25,"rem"),24:"".concat(1.5,"rem"),30:"".concat(1.875,"rem"),36:"".concat(2.25,"rem"),48:"".concat(3,"rem")},we={4:"".concat(.25,"rem"),8:"".concat(.5,"rem"),12:"".concat(.75,"rem"),16:"".concat(1,"rem"),24:"".concat(1.5,"rem"),32:"".concat(2,"rem"),48:"".concat(3,"rem"),64:"".concat(4,"rem"),96:"".concat(6,"rem"),128:"".concat(8,"rem")},ke={colors:{text:Oe["cool-grey-800"],textLight:Oe["cool-grey-050"],background:"#fff",primary:Oe["purple-500"],secondary:Oe["cool-grey-400"],muted:Oe["cool-grey-500"],gray:Oe["cool-grey-300"],highlight:"hsla(205, 100%, 40%, 0.125)",header:Oe["cool-grey-200"]},fonts:{body:"Lato, system-ui, sans-serif",heading:"inherit",monospace:"Menlo, monospace"},fontSizes:je,fontWeights:{body:400,heading:700,bold:700},lineHeights:{body:1.5,heading:1.25},space:we,radii:{default:".375rem"},shadows:{card:"0 0 4px rgba(0, 0, 0, .125)"},input:{marginRight:we[8],padding:we[8],border:"0",boxShadow:"inset 0 0 2px"},text:{heading:{fontFamily:"heading",lineHeight:"heading",fontWeight:"heading",letterSpacing:"-1px",fontSize:je[48],h1:{letterSpacing:"-1px",marginBottom:we[12],fontSize:je[48]},h2:{letterSpacing:"-1px",marginBottom:we[12],fontSize:je[30]},h3:{letterSpacing:"-1px",marginBottom:we[12],fontSize:je[24]},h4:{letterSpacing:"-1px",marginBottom:we[12],fontSize:je[20]}},display:{fontFamily:"heading",fontWeight:"heading",lineHeight:"heading",fontSize:[je[24],je[30],je[36]]},caps:{textTransform:"uppercase",letterSpacing:"0.1em"},iconButtonText:{marginLeft:we[8]},routeName:{marginRight:we[8],whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginBottom:0,fontSize:je[20],editable:{marginRight:we[8],whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginBottom:0,fontSize:je[16]}},instruction:{fontSize:je[12],color:"muted"}},variants:{header:{backgroundColor:"header",letterSpacing:"-2px",padding:we[16],justifyContent:"space-between",alignItems:"center"},sidebar:{boxShadow:"0 1px 5px rgba(0,0,0,0.65)",borderRadius:"default",overflow:"hidden"},popup:{variant:"variants.sidebar",marginTop:we[12],backgroundColor:"rgb(255 255 255 / 90%)"},content:{px:we[24],py:we[16],overflow:"auto",overflowX:"hidden"},container:{marginBottom:we[16]},label:{marginBottom:we[4]},description:{marginBottom:we[16]},alert:{marginBottom:we[16],iconContainer:{borderRadius:"50%",backgroundColor:Oe["yellow-300"],width:je[24],height:je[24],alignItems:"center",justifyContent:"center",marginRight:we[8]},icon:{color:Oe["yellow-800"],boxShadow:0,padding:0}},link:{color:"primary"},nav:{px:we[24],py:we[16],justifyContent:"center",marginTop:"auto","*:not(:only-child):not(:first-of-type)":{marginLeft:we[8]}},routeSummary:{pb:we[16]},table:{width:"100%",textAlign:"center",borderSpacing:0},th:{px:we[4],py:we[8]},td:{px:we[4],py:we[8],borderBottom:"solid 1px",borderColor:Oe["cool-grey-100"]},highlightedRow:{fontWeight:"bold",backgroundColor:Oe["cool-grey-100"]}},buttons:{primary:{cursor:"pointer",fontSize:je[16],color:"background",bg:"primary",borderRadius:"default",px:we[16],py:we[8]},outline:{variant:"buttons.primary",color:"primary",bg:"transparent",boxShadow:"inset 0 0 2px"},primaryOutline:{variant:"buttons.outline"},secondary:{variant:"buttons.primary",color:"background",bg:"secondary"},secondaryOutline:{variant:"buttons.outline",color:"secondary"},greenOutline:{variant:"buttons.outline",color:Oe["green-600"],":hover:not(.active), :focus:not(.active)":{color:"background",bg:Oe["green-600"]}},destructive:{variant:"buttons.primary",bg:Oe["red-600"],color:"background"},destructiveOutline:{variant:"buttons.outline",color:Oe["red-500"],":hover:not(.active), :focus:not(.active)":{color:"background",bg:Oe["red-600"]}},grayOutline:{variant:"buttons.outline",color:Oe["cool-grey-500"],":hover:not(.active), :focus:not(.active)":{color:Oe["cool-grey-700"],bg:Oe["cool-grey-100"]}},icon:{variant:"buttons.outline",color:"muted",boxShadow:0,padding:0},github:{variant:"buttons.outline",boxShadow:0,fontSize:je[24],color:"muted",":hover:not(.active), :focus:not(.active)":{color:"primary"}},chevron:{variant:"buttons.outline",padding:0,boxShadow:0,fontSize:je[24],color:"muted",":hover:not(.active), :focus:not(.active)":{color:"primary"}}}},xe=Object(T.a)({},ke,{palette:Oe}),Ce=a(27),Se=a.n(Ce),Le=a(45),ze=a(20),Re=a.n(ze),Ae=a(91),De=(a(176),a(177),Re()({autoProceed:!0,restrictions:{allowedFileTypes:[".gpx",".kml"]}})),Fe=function(e){return new Promise((function(t,a){var n=new FileReader;n.onload=function(){return t(n.result)},n.onerror=a,n.readAsText(e)}))},Te=function(){var e=Object(R.b)();return Object(r.useEffect)((function(){De.on("file-added",function(){var t=Object(Le.a)(Se.a.mark((function t(a){var n;return Se.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.info(a),t.next=3,Fe(a.data);case 3:n=t.sent,"gpx"===a.extension?(e(q(a.name,n)),De.removeFile(a.id)):"kml"===a.extension&&e(pe(n));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}),[]),o.a.createElement(Ae.a,{uppy:De,locale:{strings:{dropHereOr:"Przeci\u0105gnij i upu\u015b\u0107 pliki lub %{browse} (dozwolone formaty: .gpx, .kml)",browse:"przegl\u0105daj"}}})},_e=function(e){var t=e.children,a=e.icon,n=Object(A.a)(e,["children","icon"]);return o.a.createElement(he.b,n,a&&o.a.createElement("i",{className:"".concat(a),style:{marginRight:t?we[4]:0}}),t)},Be=function(e){return o.a.createElement(_e,Object.assign({as:d.b},e))},Ie=function(e){var t=e.href,a=Object(A.a)(e,["href"]);return o.a.createElement(_e,Object.assign({as:he.e,href:t},a))},Pe=a(93),Ge=function(e){var t=e.defaultValue,a=e.onAccept,n=Object(r.useRef)(null);return Object(r.useEffect)((function(){var e=n.current;e&&e.focus()}),[]),o.a.createElement(Pe.a,{ref:n,id:"name",name:"name",type:"text",defaultValue:t,onBlur:function(){return a(n.current&&n.current.value)}})},Me=function(e){var t=e.name,a=e.onChange,n=Object(r.useState)(!1),l=Object(i.a)(n,2),c=l[0],u=l[1];return c?o.a.createElement(Ge,{defaultValue:t,onAccept:function(e){u(!1),e&&a(e)}}):o.a.createElement(he.a,{sx:{cursor:"pointer"},onClick:function(){return u(!0)}},o.a.createElement(he.d,{variant:"routeName.editable"},t),o.a.createElement(he.f,{variant:"instruction"},"Kliknij, aby zmieni\u0107 nazw\u0119..."))},Ne=function(e){var t=e.route,a=Object(R.b)();return o.a.createElement(he.a,{variant:"container"},o.a.createElement(he.c,{mb:we[12],sx:{justifyContent:"space-between",alignItems:"center",minHeight:we[48]}},o.a.createElement(Me,{name:t.name,onChange:function(e){return a(function(e,t){return{type:"CHANGE_ROUTE_NAME",payload:{id:e,name:t}}}(t.id,e))}}),o.a.createElement(he.c,{sx:{flexWrap:"nowrap",flexShrink:0}},o.a.createElement(_e,{variant:"destructiveOutline",icon:"fa-fw fas fa-times",sx:{height:"100%"},onClick:function(){return a({type:"REMOVE_ROUTE",payload:{id:t.id}})}}))))},Ue=function(){var e=Object(R.c)(G),t=Object.keys(e).length;return o.a.createElement(o.a.Fragment,null,o.a.createElement(he.f,{fontSize:je[16],color:"text",sx:{textAlign:"justify",whiteSpace:"pre-line",marginBottom:we[32]}},o.a.createElement("p",null,"Witaj w aplikacji przeznaczonej do analizy tras ",o.a.createElement("code",null,".gpx"),". Dzi\u0119ki interaktywnej mapie por\xf3wnasz za\u0142adowane trasy z wyznaczonym torem, otrzymuj\u0105c szczeg\xf3\u0142owe informacje i podsumowanie dla ka\u017cdej z nich."),o.a.createElement("p",null,"Projekt powsta\u0142 na potrzeby organizacji amatorskich zawod\xf3w lotniczych przez cz\u0142onk\xf3w Aeroklubu Szczeci\u0144skiego.")),o.a.createElement(he.a,{variant:"container"},o.a.createElement(Te,null)),t>0&&o.a.createElement(he.a,{variant:"container"},o.a.createElement(he.d,{variant:"heading.h3"},"Za\u0142adowane przebiegi")),0===t&&o.a.createElement(he.f,null,"Nie za\u0142adowano \u017cadnych tras, przeci\u0105gnij pliki ",o.a.createElement("code",null,".gpx")," do okna powy\u017cej, lub u\u017cyj przegl\u0105darki plik\xf3w."),Object.entries(e).map((function(e){var t=Object(i.a)(e,2),a=(t[0],t[1]);return o.a.createElement(Ne,{key:"route-".concat(a.id),route:a})})))},We=(a(179),o.a.forwardRef((function(e,t){return o.a.createElement(he.a,Object.assign({ref:t,as:"table",variant:"table"},e))}))),He=o.a.forwardRef((function(e,t){return o.a.createElement(he.a,Object.assign({ref:t,as:"thead",variant:"thead"},e))})),Ke=o.a.forwardRef((function(e,t){return o.a.createElement(he.a,Object.assign({ref:t,as:"tbody",variant:"tbody"},e))})),Ve=o.a.forwardRef((function(e,t){return o.a.createElement(he.a,Object.assign({ref:t,as:"tr",variant:"tr"},e))})),Ye=o.a.forwardRef((function(e,t){return o.a.createElement(he.a,Object.assign({ref:t,as:"th",variant:"th"},e))})),Je=o.a.forwardRef((function(e,t){return o.a.createElement(he.a,Object.assign({ref:t,as:"td",variant:"td"},e))})),Xe=a(15),Ze=a.n(Xe),qe=function(e,t){var a=t.diff(e);return Ze.a.utc(a).format("HH:mm:ss")},Qe=function(e,t){var a=e.get_distance(),n=e.get_start_time().toString(),r=e.get_end_time().toString(),o=e.get_moving_speed(),l=e.get_total_speed(),c=e.get_elevation_min(),i=e.get_elevation_max(),u=qe(Ze()(n),Ze()(r)),s=function(e){return e.map((function(e){if("ontrack"===e.type)return null;var t=[e.latLngs[0],e.latLngs[e.latLngs.length-1]];return{id:e.id,intervals:t}})).filter((function(e){return null!==e}))}(t||[]),m=function(e){var t=e.reduce((function(e,t){var a=t.intervals,n=Ze()(a[0].meta.time);return e+=Ze()(a[1].meta.time).diff(n)}),0);return Ze.a.utc(t).format("HH:mm:ss")}(s);return{startTime:Ze()(n).format(),endTime:Ze()(r).format(),routeLength:u,distance:"".concat(a.toFixed(2)," m"),movingSpeed:"".concat(o.toFixed(2)," km/h"),totalSpeed:"".concat(l.toFixed(2)," km/h"),elevationMin:"".concat(c," m"),elevationMax:"".concat(i," m"),offtrackIntervals:s.map((function(e,t){var a=e.id,n=e.intervals,r=Ze()(n[0].meta.time),o=Ze()(n[1].meta.time);return{index:t+1,id:a,start:r.format("HH:mm:ss"),end:o.format("HH:mm:ss"),duration:qe(r,o)}})),offtrackIntervalsSum:m}},$e=function(e){var t=e.name;return o.a.createElement(he.a,null,o.a.createElement(he.d,{variant:"routeName"},t))},et=function(e){var t=e.route,a=e.analysis,n=e.gpx;if(!a)return null;var r=Qe(n,a);return o.a.createElement(he.a,{variant:"container"},o.a.createElement(he.c,{mb:we[12],sx:{justifyContent:"space-between",alignItems:"center"}},o.a.createElement($e,{name:t.name})),n&&o.a.createElement(tt,{data:r}),a&&o.a.createElement(o.a.Fragment,null,o.a.createElement(he.d,{variant:"heading.h4"},"Precyzja lotu"),o.a.createElement(nt,{data:r})))},tt=function(e){var t=e.data;return o.a.createElement(o.a.Fragment,null,o.a.createElement(he.a,{variant:"routeSummary"},o.a.createElement("span",null,"Pocz\u0105tek"),o.a.createElement(he.f,{fontWeight:"bold"},t.startTime)),o.a.createElement(he.a,{variant:"routeSummary"},o.a.createElement("span",null,"Koniec"),o.a.createElement(he.f,{fontWeight:"bold"},t.endTime)),o.a.createElement(he.a,{variant:"routeSummary"},o.a.createElement("span",null,"D\u0142ugo\u015b\u0107"),o.a.createElement(he.f,{fontWeight:"bold"},t.routeLength)),o.a.createElement(he.a,{variant:"routeSummary"},o.a.createElement("span",null,"Pokonany dystans"),o.a.createElement(he.f,{fontWeight:"bold"},t.distance)),o.a.createElement(he.a,{variant:"routeSummary"},o.a.createElement("span",null,"\u015arednia pr\u0119dko\u015b\u0107 w ruchu"),o.a.createElement(he.f,{fontWeight:"bold"},t.movingSpeed)),o.a.createElement(he.a,{variant:"routeSummary"},o.a.createElement("span",null,"\u015arednia pr\u0119dko\u015b\u0107 dla ca\u0142ego przebiegu"),o.a.createElement(he.f,{fontWeight:"bold"},t.totalSpeed)),o.a.createElement(he.a,{variant:"routeSummary"},o.a.createElement("span",null,"Minimalna wysoko\u015b\u0107 nad poziomem morza"),o.a.createElement(he.f,{fontWeight:"bold"},t.elevationMin)),o.a.createElement(he.a,{variant:"routeSummary"},o.a.createElement("span",null,"Maksymalna wysoko\u015b\u0107 nad poziomem morza"),o.a.createElement(he.f,{fontWeight:"bold"},t.elevationMax)))},at=function(e){var t=e.interval,a=e.isSelected,n=Object(r.useRef)(null);return Object(r.useEffect)((function(){a&&n.current&&n.current.scrollIntoView({behavior:"smooth",block:"center"})}),[a]),o.a.createElement(Ve,{ref:n,key:"offtrack-interval-".concat(t.id),variant:a?"highlightedRow":void 0},o.a.createElement(Je,null,t.index),o.a.createElement(Je,null,t.start),o.a.createElement(Je,null,t.end),o.a.createElement(Je,null,t.duration))},nt=function(e){var t=e.data,a=Object(R.c)(N);return o.a.createElement(We,null,o.a.createElement(He,null,o.a.createElement(Ve,null,o.a.createElement(Ye,null,"LP."),o.a.createElement(Ye,null,"Opuszczenie trasy"),o.a.createElement(Ye,null,"Powr\xf3t na tras\u0119"),o.a.createElement(Ye,null,"Czas poza tras\u0105"))),o.a.createElement(Ke,null,t.offtrackIntervals.map((function(e){return o.a.createElement(at,{interval:e,isSelected:(null===a||void 0===a?void 0:a.id)===e.id})})),!t.offtrackIntervals.length&&o.a.createElement(Ve,null,o.a.createElement(Je,null,"-"),o.a.createElement(Je,null,"-"),o.a.createElement(Je,null,"-"),o.a.createElement(Je,null,"-")),o.a.createElement(Ve,{sx:{fontWeight:"bold"}},o.a.createElement(Je,{colSpan:3,sx:{textAlign:"left"}},"\u0141\u0105cznie"),o.a.createElement(Je,null,t.offtrackIntervalsSum))))},rt=function(){var e=Object(R.c)(G),t=Object(R.c)(M),a=Object(r.useContext)(ce).layers,n=Object.keys(e).length;return o.a.createElement(o.a.Fragment,null,0===n&&o.a.createElement(he.f,null,"Nie za\u0142adowano \u017cadnych tras."),Object.entries(e).map((function(e){var n,r=Object(i.a)(e,2),l=(r[0],r[1]);return o.a.createElement(et,{key:"route-".concat(l.id),route:l,analysis:t[l.id],gpx:null===(n=a[l.id])||void 0===n?void 0:n.gpx})})))},ot=a(94),lt=a.n(ot),ct=function(){var e=Object(Le.a)(Se.a.mark((function e(t,a,n){var r,o,l,c;return Se.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.info(n),t&&n){e.next=3;break}return e.abrupt("return");case 3:return r=new lt.a.Workbook,o=r.addWorksheet("My Sheet"),l=o.getRow(1),Object.values(t).forEach((function(e,t){var r=n[e.id],c=a[e.id].gpx,i=Qe(c,r),u=5*t+1;l.getCell(u).value=e.name,o.getRow(2).getCell(u).value="Pocz\u0105tek",o.getRow(3).getCell(u).value=i.startTime,o.getRow(4).getCell(u).value="Koniec",o.getRow(5).getCell(u).value=i.endTime,o.getRow(6).getCell(u).value="D\u0142ugo\u015b\u0107",o.getRow(7).getCell(u).value=i.routeLength,o.getRow(8).getCell(u).value="Pokonany dystans",o.getRow(9).getCell(u).value=i.distance,o.getRow(10).getCell(u).value="\u015arednia pr\u0119dko\u015b\u0107 w ruchu",o.getRow(11).getCell(u).value=i.movingSpeed,o.getRow(12).getCell(u).value="\u015arednia pr\u0119dko\u015b\u0107 dla ca\u0142ego przebiegu",o.getRow(13).getCell(u).value=i.totalSpeed,o.getRow(14).getCell(u).value="Minimalna wysoko\u015b\u0107 nad poziomem morza",o.getRow(15).getCell(u).value=i.elevationMin,o.getRow(16).getCell(u).value="Maksymalna wysoko\u015b\u0107 nad poziomem morza",o.getRow(17).getCell(u).value=i.elevationMax,o.getRow(19).getCell(u).value="Precyzja lotu",o.getRow(20).getCell(u).value="LP.",o.getRow(20).getCell(u+1).value="Opuszczenie trasy",o.getRow(20).getCell(u+2).value="Powr\xf3t na tras\u0119",o.getRow(20).getCell(u+3).value="Czas poza tras\u0105",i.offtrackIntervals.length&&(i.offtrackIntervals.forEach((function(e,t){o.getRow(21+t).getCell(u).value=e.index,o.getRow(21+t).getCell(u+1).value=e.start,o.getRow(21+t).getCell(u+2).value=e.end,o.getRow(21+t).getCell(u+3).value=e.duration})),o.getRow(21+i.offtrackIntervals.length).getCell(u).value="\u0141\u0105cznie",o.getRow(21+i.offtrackIntervals.length).getCell(u+3).value=i.offtrackIntervalsSum)})),e.next=9,r.xlsx.writeBuffer();case 9:c=e.sent,it(c);case 11:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}(),it=function(e){var t=new Blob([e],{type:"application/xlsx"}),a=document.createElement("a");a.href=window.URL.createObjectURL(t);a.download="results.xlsx",a.click()},ut=function(e){var t=e.children,a=e.sidebarCollapsed;return o.a.createElement(he.a,{sx:{position:"absolute",zIndex:500,height:"100%"},className:be()("sidebar",{collapsed:a})},o.a.createElement(he.c,{variant:"sidebar",flexDirection:"column",bg:"background",sx:{height:"100%"}},t))},st=function(e){var t=e.setSidebarCollapsed,a=Object(R.c)(M),n=Object(R.c)(G),l=Object(r.useContext)(ce).layers;return o.a.createElement(o.a.Fragment,null,o.a.createElement(he.c,{variant:"header"},o.a.createElement(he.c,{sx:{alignItems:"center"}},o.a.createElement(he.d,{variant:"heading.h2",mb:"0"},o.a.createElement(he.f,{as:"span",color:"primary"},"AERO"),o.a.createElement(he.f,{as:"span",color:"muted",fontWeight:"normal"},"CONTEST")),o.a.createElement(Ie,{href:"https://github.com/zefj/aerocontest",variant:"github",icon:"fab fa-github"})),o.a.createElement(_e,{variant:"chevron",icon:"fas fa-chevron-left",onClick:function(){return t(!0)}})),o.a.createElement(he.a,{variant:"content"},o.a.createElement(Ee.c,null,o.a.createElement(Ee.a,{path:"/(route|)"},o.a.createElement(Ue,null)),o.a.createElement(Ee.a,{path:"/summary"},o.a.createElement(rt,null)))),o.a.createElement(he.c,{as:"nav",variant:"nav"},o.a.createElement(Ee.c,null,o.a.createElement(Ee.a,{path:"/(route|)"},o.a.createElement(Be,{to:"/summary",variant:"primary"},"Podsumowanie")),o.a.createElement(Ee.a,{path:"/summary"},o.a.createElement(Be,{to:"/route",variant:"secondaryOutline"},"Wr\xf3\u0107"),o.a.createElement(_e,{onClick:function(){return ct(n,l,a)},sx:{marginLeft:we[8]},variant:"primaryOutline"},"Eksportuj dane")))))},mt=function(e){var t=e.setSidebarCollapsed;return o.a.createElement(he.c,{variant:"header",sx:{height:"77px",justifyContent:"center"}},o.a.createElement(_e,{variant:"chevron",icon:"fas fa-chevron-right",onClick:function(){return t(!1)}}))},dt=function(e){var t=e.sidebarCollapsed,a=e.setSidebarCollapsed;return o.a.createElement(ut,{sidebarCollapsed:t},t&&o.a.createElement(mt,{setSidebarCollapsed:a}),!t&&o.a.createElement(st,{setSidebarCollapsed:a}))},ft=function(e){var t=e.icon,a=e.children;return o.a.createElement(he.c,{variant:"alert"},o.a.createElement(he.c,{variant:"alert.iconContainer"},o.a.createElement(he.a,{variant:"alert.icon",as:"i",className:t})),o.a.createElement(he.c,{sx:{flex:1}},o.a.createElement(he.a,{as:"span"},a)))},pt=function(){var e=Object(R.b)(),t=Object(R.c)(N),a=Object(R.c)(U);if(!t||!a)return null;var n,r=[(n=a).latLngs[0],n.latLngs[n.latLngs.length-1]],l=Ze()(r[0].meta.time),c=Ze()(r[1].meta.time),i="ontrack"===a.type||"unknown"===a.type,u="offtrack"===a.type||"unknown"===a.type,s="offtrack"===a.type||"ontrack"===a.type;return o.a.createElement(he.a,{variant:"popup",sx:{position:"absolute",zIndex:500,width:"100%",maxWidth:"300px",left:"500px",top:"0"}},o.a.createElement(he.a,{variant:"content"},o.a.createElement(he.c,{sx:{justifyContent:"space-between",flexDirection:"column"}},o.a.createElement(he.c,{sx:{justifyContent:"space-between",alignItems:"center"}},o.a.createElement(he.d,{variant:"heading.h4"},"Edycja fragmentu"),o.a.createElement(_e,{onClick:function(){return e({type:"SELECT_POLYLINE",payload:{id:void 0,ref:void 0}})},variant:"icon",icon:"fa-fw fas fa-times",sx:{marginBottom:we[12]}})),o.a.createElement(he.a,{variant:"container"},l.format("HH:mm:ss")," - ",c.format("HH:mm:ss")),"unknown"===a.type&&o.a.createElement(ft,{icon:"fa-fw fas fa-exclamation"},"Gdy r\xf3\u017cnica pomi\u0119dzy kolejnymi odczytami pozycji wynosi wi\u0119cej ni\u017c 10 sekund, fragment jest automatycznie zaliczany jako"," ",o.a.createElement("b",null,"Brak GPS"),". Podczas analizy, te fragmenty traktowane s\u0105 jako"," ",o.a.createElement("b",null,"poza tras\u0105"),"."),o.a.createElement(he.a,{variant:"label"},"Zalicz jako:"),o.a.createElement(he.c,null,u&&o.a.createElement(_e,{variant:"greenOutline",onClick:function(){return e(ee(t.id,t.analysis_id,"ontrack"))},sx:{width:"100%",marginRight:we[4]}},"W trasie"),i&&o.a.createElement(_e,{variant:"destructiveOutline",onClick:function(){return e(ee(t.id,t.analysis_id,"offtrack"))},sx:{width:"100%",marginRight:we[4]}},"Poza tras\u0105"),s&&o.a.createElement(_e,{variant:"grayOutline",onClick:function(){return e(ee(t.id,t.analysis_id,"unknown"))},sx:{width:"100%"}},"Brak GPS")))))},gt=new s.a.FeatureGroup,yt=function(e){var t=e.children,a=Object(r.useState)({layers:{},trackLayer:gt,setGpx:function(){}}),n=Object(i.a)(a,2),l=n[0],c=l.layers,u=l.trackLayer,m=n[1],d=Object(r.useCallback)((function(e,t){var a=Object(T.a)({},c);c[e]&&(a[e].gpx=t,m({layers:a,trackLayer:u,setGpx:d}))}),[c,u]),f=Object(R.c)(G);return Object(r.useEffect)((function(){var e=!1,t=Object(T.a)({},c);Object.entries(f).forEach((function(a){var n=Object(i.a)(a,2),r=(n[0],n[1]);c[r.id]||(e=!0,t[r.id]=function(){var e=new s.a.FeatureGroup,t=new s.a.LayerGroup,a=new s.a.LayerGroup,n=new s.a.FeatureGroup,r=new s.a.LayerGroup,o=new s.a.FeatureGroup;return t.addTo(e),a.addTo(e),n.addTo(e),r.addTo(e),o.addTo(e),{markers:t,layers:e,offtrackFragmentsLayer:a,offtrackMarkersLayer:n,ontrackFragmentsLayer:r,ontrackMarkersLayer:o,gpx:null}}())})),e&&m({layers:t,trackLayer:u,setGpx:d})}),[c,f,d,u]),o.a.createElement(ce.Provider,{value:{layers:c,trackLayer:u,setGpx:d}},t)},vt=a(95),bt=a.n(vt),Et=a(96),ht=a.n(Et),Ot=a(97),jt=a.n(Ot);a(181);delete s.a.Icon.Default.prototype._getIconUrl,s.a.Icon.Default.mergeOptions({iconRetinaUrl:ht.a,iconUrl:bt.a,shadowUrl:jt.a});var wt=function(){var e=[ae.a],t=[te.applyMiddleware.apply(void 0,e)],a=ne.composeWithDevTools.apply(void 0,t);return Object(te.createStore)(le,{},a)}(),kt=function(){var e=Object(r.useState)(!1),t=Object(i.a)(e,2),a=t[0],n=t[1];return o.a.createElement(R.a,{store:wt},o.a.createElement(m.a,{theme:xe},o.a.createElement(he.a,{className:"App",sx:{fontFamily:"body",fontSize:"body",color:"text"}},o.a.createElement(d.a,null,o.a.createElement(yt,null,o.a.createElement(dt,{sidebarCollapsed:a,setSidebarCollapsed:n}),o.a.createElement(pt,null),o.a.createElement(ye,null))))))};c.a.render(o.a.createElement(kt,null),document.getElementById("root"))},99:function(e,t,a){e.exports=a(182)}},[[99,1,2]]]);
//# sourceMappingURL=main.cfb163cb.chunk.js.map