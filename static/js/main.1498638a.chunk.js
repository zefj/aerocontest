(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{104:function(e,t,a){},108:function(e,t,a){},114:function(e,t,a){e.exports=a.p+"static/media/9_maj_2020_19_06_55_1589052909021.c1ba7b7b.gpx"},118:function(e,t,a){e.exports=a.p+"static/media/doc.d3194562.kml"},176:function(e,t,a){},179:function(e,t,a){"use strict";a.r(t);var n,r=a(0),o=a.n(r),l=a(41),c=a.n(l),i=(a(104),a(2)),u=a.n(i),s=(a(105),a(106),a(81)),m=a(38),f=a(10),d=a(184),p=a(183),g=a(181),y=a(182),E=a(22),b=(a(108),a(20)),v=(a(109),a(83)),h=a.n(v),O=a(84),j=a.n(O),w=a(85),k=a.n(w),x={weight:3,color:"#2c83cb",lineCap:"butt"},C={color:"#06CB13"},L={color:"#cb123d"},z={weight:10},S=a(4),R=function(e,t,a){return{type:"OVERRIDE_ANALYSIS",payload:{id:e,analysisId:t,type:a}}},A=a(32),D=a(55),F=a(7),T=a(5),_=a(185),B=a(88),I=function(e,t){return{id:Object(_.a)(),name:e,content:t}},P={entries:{},analysis:{},selected:null},M=function(e){return e.routes.entries},N=function(e){return e.routes.analysis},W=function(e){return e.routes.selected},G=Object(B.a)(N,(function(e){return e.routes.selected}),(function(e,t){if(t)for(var a=0,n=Object.values(e);a<n.length;a++){var r=n[a];if(r){var o=r.find((function(e){return e.id===t.id}));if(o)return o}}})),H=a(27),U=a(89),K={content:""},Y=function(e){return e.track},V=Object(H.combineReducers)({routes:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"ADD_ROUTE":var n=I(a.payload.name,a.payload.content);return Object(T.a)({},t,{entries:Object(T.a)({},t.entries,Object(F.a)({},n.id,n))});case"REMOVE_ROUTE":var r=t.entries,o=a.payload.id,l=(r[o],Object(A.a)(r,[o].map(D.a))),c=t.analysis,i=a.payload.id,u=(c[i],Object(A.a)(c,[i].map(D.a)));return Object(T.a)({},t,{entries:l,analysis:u});case"ROUTE_PARSED":return Object(T.a)({},t,{entries:Object(T.a)({},t.entries,Object(F.a)({},a.payload.id,Object(T.a)({},t.entries[a.payload.id])))});case"ROUTE_ANALYSED":return Object(T.a)({},t,{analysis:Object(T.a)({},t.analysis,Object(F.a)({},a.payload.id,a.payload.analysis))});case"ROUTES_ANALYSED":return Object(T.a)({},t,{analysis:a.payload.analyses,selected:null});case"CHANGE_ROUTE_NAME":return Object(T.a)({},t,{entries:Object(T.a)({},t.entries,Object(F.a)({},a.payload.id,Object(T.a)({},t.entries[a.payload.id],{name:a.payload.name})))});case"SELECT_POLYLINE":return a.payload.id?Object(T.a)({},t,{selected:{id:a.payload.id,analysis_id:a.payload.analysisId}}):Object(T.a)({},t,{selected:null});case"OVERRIDE_ANALYSIS":return Object(T.a)({},t,{analysis:Object(T.a)({},t.analysis,Object(F.a)({},a.payload.analysisId,null===(e=t.analysis[a.payload.analysisId])||void 0===e?void 0:e.map((function(e){return e.id===a.payload.id?Object(T.a)({},e,{type:a.payload.type}):e}))))});default:return t}},track:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOAD_TRACK":return Object(T.a)({},e,{content:t.payload.content});default:return e}}}),J=o.a.createContext({layers:{},trackLayer:new u.a.FeatureGroup,setGpx:function(){}}),Z=(a(114),{gpx_options:{joinTrackSegments:!0},marker_options:{startIconUrl:h.a,endIconUrl:j.a,shadowUrl:k.a},polyline_options:x}),X=function(){var e=Object(b.b)().map,t=Object(S.c)(M),a=Object(r.useContext)(J),n=a.layers,o=a.setGpx,l=Object(S.b)();return Object(r.useEffect)((function(){0}),[l]),Object(r.useEffect)((function(){e&&t&&(Object.entries(t).forEach((function(t){var a=Object(f.a)(t,2),r=(a[0],a[1]),c=n[r.id];if(c&&!c.gpx){var i=new u.a.GPX(r.content,Z);o(r.id,i),l({type:"ROUTE_PARSED",payload:{id:r.id}}),i.addTo(c.layers),c.layers.addTo(e)}})),Object.entries(n).forEach((function(e){var a=Object(f.a)(e,2),n=a[0],r=a[1];t[n]||r.layers.remove()})))}),[e,t,n,o,l]),Object(r.useEffect)((function(){if(e){var a=function(e,t){return Object.values(e).reduce((function(e,a){var n=t[a.id];return n&&n.gpx?e?e.extend(n.gpx.getBounds()):n.gpx.getBounds():e}),null)}(t,n);a&&e.fitBounds(a)}}),[n,e,t]),null},q=(a(115),function(e){var t=e.drawingMode,a=void 0!==t&&t,o=Object(b.b)().map,l=Object(r.useContext)(J).trackLayer;return Object(r.useEffect)((function(){var e={position:"topleft",draw:{polyline:!1,marker:!1,circlemarker:!1},edit:{featureGroup:l}};n=new u.a.Control.Draw(e)}),[o,l]),Object(r.useEffect)((function(){o&&o.addLayer(l)}),[o,l]),Object(r.useEffect)((function(){o&&n&&(a?o.addControl(n):o.removeControl(n))}),[o,a]),Object(r.useEffect)((function(){o&&o.on(u.a.Draw.Event.CREATED,(function(e){var t=e.layer;l.addLayer(t)}))}),[o,l]),null}),Q=a(90),$=a.n(Q),ee=a(91),te=a.n(ee),ae=a(37),ne=function(e){var t=e.getLayers()[0].getLayers(),a=!0,n=!1,r=void 0;try{for(var o,l=t[Symbol.iterator]();!(a=(o=l.next()).done);a=!0){var c=o.value;if(c instanceof u.a.Polyline)return c}}catch(i){n=!0,r=i}finally{try{a||null==l.return||l.return()}finally{if(n)throw r}}return null},re=function e(t,a){for(var n,r=a.getLayers(),o=0;o<r.length;o++){var l=r[o],c=!1;if(l instanceof u.a.FeatureGroup&&(c=e(t,l)),l instanceof u.a.Path){var i=Object(ae.point)([t.lng,t.lat]),s=(n=l)instanceof u.a.Circle?te()(n.toGeoJSON().geometry.coordinates,n.getRadius(),{steps:10,units:"meters"}):n instanceof u.a.Polygon?n.toGeoJSON():n instanceof u.a.Polyline?new u.a.Polygon(n.getLatLngs()).toGeoJSON():null;if(null===s)continue;c=$()(i,s)}if(c)return c}return!1},oe=function(e,t){for(var a=e.getLatLngs(),n=[],r=0;r<a.length;r++){var o=a[r],l=re(o,t),c=n[n.length-1];if(c||(c={id:Object(_.a)(),type:l?"ontrack":"offtrack",latLngs:[]},n.push(c)),l){var i=c;"offtrack"===c.type&&(c.latLngs.push(o),i={id:Object(_.a)(),type:"ontrack",latLngs:[]},n.push(i)),i.latLngs.push(o)}else{var u=c;"ontrack"===c.type&&(c.latLngs.push(o),u={id:Object(_.a)(),type:"offtrack",latLngs:[]},n.push(u)),u.latLngs.push(o)}}return n.filter((function(e){return e.latLngs.length>0}))},le=function(){var e=Object(S.b)(),t=Object(b.b)().map,a=Object(r.useContext)(J),n=a.layers,o=a.trackLayer,l=Object(S.c)(M),c=Object(r.useCallback)((function(){if(t&&o){var a=function(e,t,a){console.log("Running analysis...");var n={};if(0===a.getLayers().length)return n;for(var r=0,o=Object.entries(e);r<o.length;r++){var l=Object(f.a)(o[r],2)[1],c=t[l.id];if(null===c||void 0===c?void 0:c.gpx){var i=ne(c.gpx);if(!i)throw new Error("Polyline layer not found in route.");var u=oe(i,a);n=Object(T.a)({},n,Object(F.a)({},l.id,u))}}return n}(l,n,o);e(function(e){return{type:"ROUTES_ANALYSED",payload:{analyses:e}}}(a))}}),[n]);return Object(r.useEffect)((function(){return function(e,t){if(e){console.log("Registering leaflet event listeners...");var a=function(e){return t()};return e.on(u.a.Draw.Event.CREATED,a),e.on(u.a.Draw.Event.EDITED,a),e.on(u.a.Draw.Event.DELETED,a),e.on("TRACK_LOADED",a),function(){e.off(u.a.Draw.Event.CREATED,a),e.off(u.a.Draw.Event.EDITED,a),e.off(u.a.Draw.Event.DELETED,a),e.off("TRACK_LOADED",a)}}}(t,c)}),[c]),Object(r.useEffect)((function(){return c()}),[c]),null},ce=function(e,t,a,n,r){t.offtrackMarkersLayer.clearLayers(),t.offtrackFragmentsLayer.clearLayers(),t.ontrackMarkersLayer.clearLayers(),t.ontrackFragmentsLayer.clearLayers(),a.forEach((function(a){var o=Object(T.a)({},x,{},"ontrack"===a.type?C:L,{},(null===n||void 0===n?void 0:n.id)===a.id?z:{}),l=u.a.polyline(a.latLngs,o);l.on("click",(function(t){r(a.id,e)})).on("mouseover",(function(e){l.setStyle(Object(T.a)({},o,{},z))})).on("mouseout",(function(e){l.setStyle(o)})).addTo(t.offtrackFragmentsLayer)}))},ie=function(){var e=Object(b.b)().map,t=Object(S.c)(N),a=Object(r.useContext)(J).layers,n=Object(S.c)(M),o=!Object.keys(t).length,l=Object(S.b)(),c=Object(r.useCallback)((function(e,t){return l(function(e,t){return{type:"SELECT_POLYLINE",payload:{id:e,analysisId:t}}}(e,t))}),[l]),i=Object(S.c)(W);return Object(r.useEffect)((function(){if(e)for(var r=0,l=Object.entries(n);r<l.length;r++){var u=Object(f.a)(l[r],2),s=u[0],m=u[1],d=a[m.id];if(null===d||void 0===d?void 0:d.gpx){var p=ne(d.gpx);if(!p)throw new Error("Polyline layer not found in route.");o||e.removeLayer(p),o&&!e.hasLayer(p)&&e.addLayer(p);var g=t[s]||[];ce(s,d,g,i,c)}}}),[e,t,i,n,a,o,c]),null},ue=(a(117),a(118),function(){var e=Object(b.b)().map,t=Object(S.b)(),a=Object(r.useContext)(J).trackLayer,n=Object(S.c)(Y);return Object(r.useEffect)((function(){0}),[t]),Object(r.useEffect)((function(){if(e&&(null===n||void 0===n?void 0:n.content)){var t=(new DOMParser).parseFromString(n.content,"text/xml");new u.a.KML(t).getLayers()[0].getLayers().forEach((function(e){return a.addLayer(e)})),e.fireEvent("TRACK_LOADED")}}),[e,n,a]),null}),se=function(){var e=Object(r.useState)({lat:51.505,lng:-.09}),t=Object(f.a)(e,1)[0],a=Object(r.useState)(13),n=Object(f.a)(a,1)[0];return o.a.createElement("div",{className:"map-container"},o.a.createElement(d.a,{center:t,zoom:n,zoomControl:!1,preferCanvas:!1},o.a.createElement(p.a,{attribution:'&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),o.a.createElement(g.a,{position:"topleft"}),o.a.createElement(y.a,{position:"bottomleft",imperial:!1}),o.a.createElement(le,null),o.a.createElement(X,null),o.a.createElement(ue,null),o.a.createElement(E.a,{path:"/track"},(function(e){var t=e.match;return o.a.createElement(q,{drawingMode:Boolean(t)})})),o.a.createElement(ie,null)))},me=a(1),fe=a(21),de=a.n(fe),pe=a(31),ge=a(18),ye=a.n(ge),Ee=a(47),be=(a(79),a(80),ye()({autoProceed:!0,restrictions:{allowedFileTypes:[".gpx"]}})),ve=function(e){return new Promise((function(t,a){var n=new FileReader;n.onload=function(){return t(n.result)},n.onerror=a,n.readAsText(e)}))},he=function(){var e=Object(S.b)();return Object(r.useEffect)((function(){be.on("file-added",function(){var t=Object(pe.a)(de.a.mark((function t(a){var n;return de.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,ve(a.data);case 2:n=t.sent,e({type:"ADD_ROUTE",payload:{name:a.name,content:n}});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}),[e]),o.a.createElement(Ee.a,{uppy:be,locale:{strings:{dropHereOr:"Przeci\u0105gnij i upu\u015b\u0107 plik w formacie .gpx lub %{browse}",browse:"przegl\u0105daj"}}})},Oe={"light-blue-050":"#EBF8FF","light-blue-100":"#D1EEFC","light-blue-200":"#A7D8F0","light-blue-300":"#7CC1E4","light-blue-400":"#55AAD4","light-blue-500":"#3994C1","light-blue-600":"#2D83AE","light-blue-700":"#1D6F98","light-blue-800":"#166086","light-blue-900":"#0B4F71","green-050":"#E3F9E5","green-100":"#C1EAC5","green-200":"#A3D9A5","green-300":"#7BC47F","green-400":"#57AE5B","green-500":"#3F9142","green-600":"#2F8132","green-700":"#207227","green-800":"#0E5814","green-900":"#05400A","cool-grey-050":"#F5F7FA","cool-grey-100":"#E4E7EB","cool-grey-200":"#CBD2D9","cool-grey-300":"#9AA5B1","cool-grey-400":"#7B8794","cool-grey-500":"#616E7C","cool-grey-600":"#52606D","cool-grey-700":"#3E4C59","cool-grey-800":"#323F4B","cool-grey-900":"#1F2933","purple-050":"#EAE2F8","purple-100":"#CFBCF2","purple-200":"#A081D9","purple-300":"#8662C7","purple-400":"#724BB7","purple-500":"#653CAD","purple-600":"#51279B","purple-700":"#421987","purple-800":"#34126F","purple-900":"#240754","red-050":"#FFEEEE","red-100":"#FACDCD","red-200":"#F29B9B","red-300":"#E66A6A","red-400":"#D64545","red-500":"#BA2525","red-600":"#A61B1B","red-700":"#911111","red-800":"#780A0A","red-900":"#610404","yellow-050":"#FFFAEB","yellow-100":"#FCEFC7","yellow-200":"#F8E3A3","yellow-300":"#F9DA8B","yellow-400":"#F7D070","yellow-500":"#E9B949","yellow-600":"#C99A2E","yellow-700":"#A27C1A","yellow-800":"#7C5E10","yellow-900":"#513C06"},je={body:"14px",12:"".concat(.75,"rem"),14:"".concat(.875,"rem"),16:"".concat(1,"rem"),18:"".concat(1.125,"rem"),20:"".concat(1.25,"rem"),24:"".concat(1.5,"rem"),30:"".concat(1.875,"rem"),36:"".concat(2.25,"rem"),48:"".concat(3,"rem")},we={4:"".concat(.25,"rem"),8:"".concat(.5,"rem"),12:"".concat(.75,"rem"),16:"".concat(1,"rem"),24:"".concat(1.5,"rem"),32:"".concat(2,"rem"),48:"".concat(3,"rem"),64:"".concat(4,"rem"),96:"".concat(6,"rem"),128:"".concat(8,"rem")},ke={colors:{text:Oe["cool-grey-800"],textLight:Oe["cool-grey-050"],background:"#fff",primary:Oe["purple-500"],secondary:Oe["cool-grey-400"],muted:Oe["cool-grey-500"],gray:Oe["cool-grey-300"],highlight:"hsla(205, 100%, 40%, 0.125)",header:Oe["cool-grey-200"]},fonts:{body:"Lato, system-ui, sans-serif",heading:"inherit",monospace:"Menlo, monospace"},fontSizes:je,fontWeights:{body:400,heading:700,bold:700},lineHeights:{body:1.5,heading:1.25},space:we,radii:{default:".375rem"},shadows:{card:"0 0 4px rgba(0, 0, 0, .125)"},input:{marginRight:we[8],padding:we[8],border:"0",boxShadow:"inset 0 0 2px"},text:{heading:{fontFamily:"heading",lineHeight:"heading",fontWeight:"heading",letterSpacing:"-1px",fontSize:je[48],h1:{letterSpacing:"-1px",marginBottom:we[12],fontSize:je[48]},h2:{letterSpacing:"-1px",marginBottom:we[12],fontSize:je[30]},h3:{letterSpacing:"-1px",marginBottom:we[12],fontSize:je[24]},h4:{letterSpacing:"-1px",marginBottom:we[12],fontSize:je[20]}},display:{fontFamily:"heading",fontWeight:"heading",lineHeight:"heading",fontSize:[je[24],je[30],je[36]]},caps:{textTransform:"uppercase",letterSpacing:"0.1em"},iconButtonText:{marginLeft:we[8]},routeName:{marginRight:we[8],whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginBottom:0,fontSize:je[20],editable:{marginRight:we[8],whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginBottom:0,fontSize:je[16]}},instruction:{fontSize:je[12],color:"muted"}},variants:{header:{backgroundColor:"header",letterSpacing:"-2px",padding:we[16],justifyContent:"space-between",alignItems:"center"},sidebar:{boxShadow:"0 1px 5px rgba(0,0,0,0.65)",borderRadius:"default",overflow:"hidden"},popup:{variant:"variants.sidebar",marginTop:we[12],backgroundColor:"rgb(255 255 255 / 90%)"},content:{px:we[24],py:we[16],overflow:"auto",overflowX:"hidden"},container:{marginBottom:we[24]},link:{color:"primary"},nav:{px:we[24],py:we[16],justifyContent:"center",marginTop:"auto","*:not(:only-child):not(:first-of-type)":{marginLeft:we[8]}},routeSummary:{pb:we[16]},table:{width:"100%",textAlign:"center",borderSpacing:0},th:{px:we[4],py:we[8]},td:{px:we[4],py:we[8],borderBottom:"solid 1px",borderColor:Oe["cool-grey-100"]}},buttons:{primary:{cursor:"pointer",fontSize:je[16],color:"background",bg:"primary",borderRadius:"default",px:we[16],py:we[8]},outline:{variant:"buttons.primary",color:"primary",bg:"transparent",boxShadow:"inset 0 0 2px"},primaryOutline:{variant:"buttons.outline"},secondary:{variant:"buttons.primary",color:"background",bg:"secondary"},secondaryOutline:{variant:"buttons.outline",color:"secondary"},greenOutline:{variant:"buttons.outline",color:Oe["green-600"],":hover:not(.active), :focus:not(.active)":{color:"background",bg:Oe["green-600"]}},destructive:{variant:"buttons.primary",bg:Oe["red-600"],color:"background"},destructiveOutline:{variant:"buttons.outline",color:Oe["red-500"],":hover:not(.active), :focus:not(.active)":{color:"background",bg:Oe["red-600"]}},icon:{variant:"buttons.outline",color:"muted",boxShadow:0,padding:0},github:{variant:"buttons.outline",boxShadow:0,fontSize:je[24],color:"muted",":hover:not(.active), :focus:not(.active)":{color:"primary"}}}},xe=Object(T.a)({},ke,{palette:Oe}),Ce=function(e){var t=e.children,a=e.icon,n=Object(A.a)(e,["children","icon"]);return o.a.createElement(me.b,n,a&&o.a.createElement("i",{className:"".concat(a),style:{marginRight:t?we[4]:0}}),t)},Le=function(e){return o.a.createElement(Ce,Object.assign({as:m.b},e))},ze=function(e){var t=e.href,a=Object(A.a)(e,["href"]);return o.a.createElement(Ce,Object.assign({as:me.e,href:t},a))},Se=a(93),Re=function(e){var t=e.defaultValue,a=e.onAccept,n=Object(r.useRef)(null);return Object(r.useEffect)((function(){var e=n.current;e&&e.focus()}),[]),o.a.createElement(Se.a,{ref:n,id:"name",name:"name",type:"text",defaultValue:t,onBlur:function(){return a(n.current&&n.current.value)}})},Ae=function(e){var t=e.name,a=e.onChange,n=Object(r.useState)(!1),l=Object(f.a)(n,2),c=l[0],i=l[1];return c?o.a.createElement(Re,{defaultValue:t,onAccept:function(e){i(!1),e&&a(e)}}):o.a.createElement(me.a,{sx:{cursor:"pointer"},onClick:function(){return i(!0)}},o.a.createElement(me.d,{variant:"routeName.editable"},t),o.a.createElement(me.f,{variant:"instruction"},"Kliknij, aby zmieni\u0107 nazw\u0119..."))},De=function(e){var t=e.route,a=Object(S.b)();return o.a.createElement(me.a,{variant:"container"},o.a.createElement(me.c,{mb:we[12],sx:{justifyContent:"space-between",alignItems:"center",minHeight:we[48]}},o.a.createElement(Ae,{name:t.name,onChange:function(e){return a(function(e,t){return{type:"CHANGE_ROUTE_NAME",payload:{id:e,name:t}}}(t.id,e))}}),o.a.createElement(me.c,{sx:{flexWrap:"nowrap",flexShrink:0}},o.a.createElement(Ce,{variant:"destructiveOutline",icon:"fa-fw fas fa-times",sx:{height:"100%"},onClick:function(){return a({type:"REMOVE_ROUTE",payload:{id:t.id}})}}))))},Fe=function(){var e=Object(S.c)(M),t=Object.keys(e).length;return o.a.createElement(o.a.Fragment,null,o.a.createElement(me.a,{variant:"container"},o.a.createElement(he,null)),t>0&&o.a.createElement(me.a,{variant:"container"},o.a.createElement(me.d,{variant:"heading.h3"},"Za\u0142adowane przebiegi")),0===t&&o.a.createElement(me.f,null,"Nie za\u0142adowano \u017cadnych tras, przeci\u0105gnij pliki ",o.a.createElement("code",null,".gpx")," do okna powy\u017cej, lub u\u017cyj przegl\u0105darki plik\xf3w."),Object.entries(e).map((function(e){var t=Object(f.a)(e,2),a=(t[0],t[1]);return o.a.createElement(De,{key:"route-".concat(a.id),route:a})})))},Te=(a(176),function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(me.f,{fontSize:je[18],color:"text",sx:{textAlign:"justify",whiteSpace:"pre-line"}},o.a.createElement("p",null,"Witaj w aplikacji przeznaczonej do analizy tras ",o.a.createElement("code",null,".gpx"),". Dzi\u0119ki interaktywnej mapie, por\xf3wnasz za\u0142adowane trasy z wyznaczonym torem, otrzymuj\u0105c szczeg\xf3\u0142owe informacje, podsumowanie i punktacje dla ka\u017cdej z nich."),o.a.createElement("p",null,"Projekt powsta\u0142 na potrzeby organizacji amatorskich zawod\xf3w lotniczych przez cz\u0142onk\xf3w Aeroklubu Szczeci\u0144skiego.")))}),_e=ye()({autoProceed:!0,restrictions:{allowedFileTypes:[".kml"]}}),Be=function(e){return new Promise((function(t,a){var n=new FileReader;n.onload=function(){return t(n.result)},n.onerror=a,n.readAsText(e)}))},Ie=function(){var e=Object(S.b)();return Object(r.useEffect)((function(){_e.on("file-added",function(){var t=Object(pe.a)(de.a.mark((function t(a){var n;return de.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Be(a.data);case 2:n=t.sent,e({type:"LOAD_TRACK",payload:{content:n}});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}),[e]),o.a.createElement(Ee.a,{uppy:_e,locale:{strings:{dropHereOr:"Przeci\u0105gnij i upu\u015b\u0107 plik w formacie .kml lub %{browse}",browse:"przegl\u0105daj"}}})},Pe=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(me.a,{variant:"container"},o.a.createElement(Ie,null)),o.a.createElement(me.a,{variant:"container"},o.a.createElement(me.f,null,"Za\u0142aduj plik w formacie ",o.a.createElement("code",null,".kml")," powy\u017cej, lub u\u017cyj przycisk\xf3w po prawej, by wyrysowa\u0107 tras\u0119.")))},Me=o.a.forwardRef((function(e,t){return o.a.createElement(me.a,Object.assign({ref:t,as:"table",variant:"table"},e))})),Ne=o.a.forwardRef((function(e,t){return o.a.createElement(me.a,Object.assign({ref:t,as:"thead",variant:"thead"},e))})),We=o.a.forwardRef((function(e,t){return o.a.createElement(me.a,Object.assign({ref:t,as:"tbody",variant:"tbody"},e))})),Ge=o.a.forwardRef((function(e,t){return o.a.createElement(me.a,Object.assign({ref:t,as:"tr",variant:"tr"},e))})),He=o.a.forwardRef((function(e,t){return o.a.createElement(me.a,Object.assign({ref:t,as:"th",variant:"th"},e))})),Ue=o.a.forwardRef((function(e,t){return o.a.createElement(me.a,Object.assign({ref:t,as:"td",variant:"td"},e))})),Ke=a(15),Ye=a.n(Ke),Ve=function(e,t){var a=t.diff(e);return Ye.a.utc(a).format("HH:mm:ss")},Je=function(e,t){var a=e.get_distance(),n=e.get_start_time().toString(),r=e.get_end_time().toString(),o=e.get_moving_speed(),l=e.get_total_speed(),c=e.get_elevation_min(),i=e.get_elevation_max(),u=Ve(Ye()(n),Ye()(r)),s=function(e){return e.map((function(e){return"ontrack"===e.type?[]:[e.latLngs[0],e.latLngs[e.latLngs.length-1]]})).filter((function(e){return e.length}))}(t||[]),m=function(e){var t=e.reduce((function(e,t){var a=Ye()(t[0].meta.time);return e+=Ye()(t[1].meta.time).diff(a)}),0);return Ye.a.utc(t).format("HH:mm:ss")}(s);return{startTime:Ye()(n).format(),endTime:Ye()(r).format(),routeLength:u,distance:"".concat(a.toFixed(2)," m"),movingSpeed:"".concat(o.toFixed(2)," km/h"),totalSpeed:"".concat(l.toFixed(2)," km/h"),elevationMin:"".concat(c," m"),elevationMax:"".concat(i," m"),offtrackIntervals:s.map((function(e,t){var a=Ye()(e[0].meta.time),n=Ye()(e[1].meta.time);return{index:t+1,start:a.format("HH:mm:ss"),end:n.format("HH:mm:ss"),duration:Ve(a,n)}})),offtrackIntervalsSum:m}},Ze=function(e){var t=e.name;return o.a.createElement(me.a,null,o.a.createElement(me.d,{variant:"routeName"},t))},Xe=function(e){var t=e.route,a=e.analysis,n=e.gpx;if(!a)return null;var r=Je(n,a);return o.a.createElement(me.a,{variant:"container"},o.a.createElement(me.c,{mb:we[12],sx:{justifyContent:"space-between",alignItems:"center"}},o.a.createElement(Ze,{name:t.name})),n&&o.a.createElement(qe,{data:r}),a&&o.a.createElement(o.a.Fragment,null,o.a.createElement(me.d,{variant:"heading.h4"},"Precyzja lotu"),o.a.createElement(Qe,{data:r})))},qe=function(e){var t=e.data;return o.a.createElement(o.a.Fragment,null,o.a.createElement(me.a,{variant:"routeSummary"},o.a.createElement("span",null,"Pocz\u0105tek"),o.a.createElement(me.f,{fontWeight:"bold"},t.startTime)),o.a.createElement(me.a,{variant:"routeSummary"},o.a.createElement("span",null,"Koniec"),o.a.createElement(me.f,{fontWeight:"bold"},t.endTime)),o.a.createElement(me.a,{variant:"routeSummary"},o.a.createElement("span",null,"D\u0142ugo\u015b\u0107"),o.a.createElement(me.f,{fontWeight:"bold"},t.routeLength)),o.a.createElement(me.a,{variant:"routeSummary"},o.a.createElement("span",null,"Pokonany dystans"),o.a.createElement(me.f,{fontWeight:"bold"},t.distance)),o.a.createElement(me.a,{variant:"routeSummary"},o.a.createElement("span",null,"\u015arednia pr\u0119dko\u015b\u0107 w ruchu"),o.a.createElement(me.f,{fontWeight:"bold"},t.movingSpeed)),o.a.createElement(me.a,{variant:"routeSummary"},o.a.createElement("span",null,"\u015arednia pr\u0119dko\u015b\u0107 dla ca\u0142ego przebiegu"),o.a.createElement(me.f,{fontWeight:"bold"},t.totalSpeed)),o.a.createElement(me.a,{variant:"routeSummary"},o.a.createElement("span",null,"Minimalna wysoko\u015b\u0107 nad poziomem morza"),o.a.createElement(me.f,{fontWeight:"bold"},t.elevationMin)),o.a.createElement(me.a,{variant:"routeSummary"},o.a.createElement("span",null,"Maksymalna wysoko\u015b\u0107 nad poziomem morza"),o.a.createElement(me.f,{fontWeight:"bold"},t.elevationMax)))},Qe=function(e){var t=e.data;return o.a.createElement(Me,null,o.a.createElement(Ne,null,o.a.createElement(Ge,null,o.a.createElement(He,null,"LP."),o.a.createElement(He,null,"Opuszczenie trasy"),o.a.createElement(He,null,"Powr\xf3t na tras\u0119"),o.a.createElement(He,null,"Czas poza tras\u0105"))),o.a.createElement(We,null,t.offtrackIntervals.map((function(e){return o.a.createElement(Ge,{key:e.index},o.a.createElement(Ue,null,e.index),o.a.createElement(Ue,null,e.start),o.a.createElement(Ue,null,e.end),o.a.createElement(Ue,null,e.duration))})),!t.offtrackIntervals.length&&o.a.createElement(Ge,null,o.a.createElement(Ue,null,"-"),o.a.createElement(Ue,null,"-"),o.a.createElement(Ue,null,"-"),o.a.createElement(Ue,null,"-")),o.a.createElement(Ge,{sx:{fontWeight:"bold"}},o.a.createElement(Ue,{colSpan:3,sx:{textAlign:"left"}},"\u0141\u0105cznie"),o.a.createElement(Ue,null,t.offtrackIntervalsSum))))},$e=function(){var e=Object(S.c)(M),t=Object(S.c)(N),a=Object(r.useContext)(J).layers,n=Object.keys(e).length;return o.a.createElement(o.a.Fragment,null,0===n&&o.a.createElement(me.f,null,"Nie za\u0142adowano \u017cadnych tras."),Object.entries(e).map((function(e){var n,r=Object(f.a)(e,2),l=(r[0],r[1]);return o.a.createElement(Xe,{key:"route-".concat(l.id),route:l,analysis:t[l.id],gpx:null===(n=a[l.id])||void 0===n?void 0:n.gpx})})))},et=a(94),tt=a.n(et),at=function(){var e=Object(pe.a)(de.a.mark((function e(t,a,n){var r,o,l,c;return de.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.info(n),t&&n){e.next=3;break}return e.abrupt("return");case 3:return r=new tt.a.Workbook,o=r.addWorksheet("My Sheet"),l=o.getRow(1),Object.values(t).forEach((function(e,t){var r=n[e.id],c=a[e.id].gpx,i=Je(c,r),u=5*t+1;l.getCell(u).value=e.name,o.getRow(2).getCell(u).value="Pocz\u0105tek",o.getRow(3).getCell(u).value=i.startTime,o.getRow(4).getCell(u).value="Koniec",o.getRow(5).getCell(u).value=i.endTime,o.getRow(6).getCell(u).value="D\u0142ugo\u015b\u0107",o.getRow(7).getCell(u).value=i.routeLength,o.getRow(8).getCell(u).value="Pokonany dystans",o.getRow(9).getCell(u).value=i.distance,o.getRow(10).getCell(u).value="\u015arednia pr\u0119dko\u015b\u0107 w ruchu",o.getRow(11).getCell(u).value=i.movingSpeed,o.getRow(12).getCell(u).value="\u015arednia pr\u0119dko\u015b\u0107 dla ca\u0142ego przebiegu",o.getRow(13).getCell(u).value=i.totalSpeed,o.getRow(14).getCell(u).value="Minimalna wysoko\u015b\u0107 nad poziomem morza",o.getRow(15).getCell(u).value=i.elevationMin,o.getRow(16).getCell(u).value="Maksymalna wysoko\u015b\u0107 nad poziomem morza",o.getRow(17).getCell(u).value=i.elevationMax,o.getRow(19).getCell(u).value="Precyzja lotu",o.getRow(20).getCell(u).value="LP.",o.getRow(20).getCell(u+1).value="Opuszczenie trasy",o.getRow(20).getCell(u+2).value="Powr\xf3t na tras\u0119",o.getRow(20).getCell(u+3).value="Czas poza tras\u0105",i.offtrackIntervals.length&&(i.offtrackIntervals.forEach((function(e,t){o.getRow(21+t).getCell(u).value=e.index,o.getRow(21+t).getCell(u+1).value=e.start,o.getRow(21+t).getCell(u+2).value=e.end,o.getRow(21+t).getCell(u+3).value=e.duration})),o.getRow(21+i.offtrackIntervals.length).getCell(u).value="\u0141\u0105cznie",o.getRow(21+i.offtrackIntervals.length).getCell(u+3).value=i.offtrackIntervalsSum)})),e.next=9,r.xlsx.writeBuffer();case 9:c=e.sent,nt(c);case 11:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}(),nt=function(e){var t=new Blob([e],{type:"application/xlsx"}),a=document.createElement("a");a.href=window.URL.createObjectURL(t);a.download="results.xlsx",a.click()},rt=function(){var e=Object(S.c)(N),t=Object(S.c)(M),a=Object(r.useContext)(J).layers;return o.a.createElement(me.a,{sx:{position:"absolute",zIndex:500,height:"100%"},className:"sidebar"},o.a.createElement(me.c,{variant:"sidebar",flexDirection:"column",bg:"background",sx:{height:"100%"}},o.a.createElement(me.c,{variant:"header"},o.a.createElement(me.d,{variant:"heading.h2",mb:"0"},o.a.createElement(me.f,{as:"span",color:"primary"},"AERO"),o.a.createElement(me.f,{as:"span",color:"muted",fontWeight:"normal"},"CONTEST")),o.a.createElement(ze,{href:"https://github.com/zefj/aerocontest",variant:"github",icon:"fab fa-github"})),o.a.createElement(me.a,{variant:"content"},o.a.createElement(E.c,null,o.a.createElement(E.a,{path:"/(welcome|)"},o.a.createElement(Te,null)),o.a.createElement(E.a,{path:"/route"},o.a.createElement(Fe,null)),o.a.createElement(E.a,{path:"/track"},o.a.createElement(Pe,null)),o.a.createElement(E.a,{path:"/summary"},o.a.createElement($e,null)))),o.a.createElement(me.c,{as:"nav",variant:"nav"},o.a.createElement(E.c,null,o.a.createElement(E.a,{path:"/(welcome|)"},o.a.createElement(Le,{to:"/route",variant:"primary"},"Zaczynamy")),o.a.createElement(E.a,{path:"/(route|)"},o.a.createElement(Le,{to:"/welcome",variant:"secondaryOutline"},"Wr\xf3\u0107"),o.a.createElement(Le,{to:"/track",variant:"primary"},"Wyznacz tras\u0119")),o.a.createElement(E.a,{path:"/track"},o.a.createElement(Le,{to:"/route",variant:"secondaryOutline"},"Wr\xf3\u0107"),o.a.createElement(Le,{to:"/summary",variant:"primary"},"Podsumowanie")),o.a.createElement(E.a,{path:"/summary"},o.a.createElement(Le,{to:"/track",variant:"secondaryOutline"},"Wr\xf3\u0107"),o.a.createElement(Ce,{onClick:function(){return at(t,a,e)},sx:{marginLeft:we[8]},variant:"primaryOutline"},"Eksportuj dane"))))))},ot=function(){var e=Object(S.b)(),t=Object(S.c)(W),a=Object(S.c)(G);if(!t||!a)return null;var n,r=[(n=a).latLngs[0],n.latLngs[n.latLngs.length-1]],l=Ye()(r[0].meta.time),c=Ye()(r[1].meta.time);return o.a.createElement(me.a,{variant:"popup",sx:{position:"absolute",zIndex:500,width:"100%",maxWidth:"300px",left:"500px",top:"0"}},o.a.createElement(me.a,{variant:"content"},o.a.createElement(me.c,{sx:{justifyContent:"space-between",flexDirection:"column"}},o.a.createElement(me.c,{sx:{justifyContent:"space-between",alignItems:"center"}},o.a.createElement(me.d,{variant:"heading.h4"},"Edycja fragmentu"),o.a.createElement(Ce,{onClick:function(){return e({type:"SELECT_POLYLINE",payload:{id:void 0,ref:void 0}})},variant:"icon",icon:"fa-fw fas fa-times",sx:{marginBottom:we[12]}})),o.a.createElement(me.a,{variant:"container"},l.format("HH:mm:ss")," - ",c.format("HH:mm:ss")),o.a.createElement(me.a,{sx:{alignSelf:"flex-end"}},"offtrack"===a.type&&o.a.createElement(Ce,{variant:"greenOutline",onClick:function(){return e(R(t.id,t.analysis_id,"ontrack"))}},"Zalicz jako w trasie"),"ontrack"===a.type&&o.a.createElement(Ce,{variant:"destructiveOutline",onClick:function(){return e(R(t.id,t.analysis_id,"offtrack"))}},"Zalicz jako poza tras\u0105")))))},lt=new u.a.FeatureGroup,ct=function(e){var t=e.children,a=Object(r.useState)({layers:{},trackLayer:lt,setGpx:function(){}}),n=Object(f.a)(a,2),l=n[0],c=l.layers,i=l.trackLayer,s=n[1],m=Object(r.useCallback)((function(e,t){var a=Object(T.a)({},c);c[e]&&(a[e].gpx=t,s({layers:a,trackLayer:i,setGpx:m}))}),[c,i]),d=Object(S.c)(M);return Object(r.useEffect)((function(){var e=!1,t=Object(T.a)({},c);Object.entries(d).forEach((function(a){var n=Object(f.a)(a,2),r=(n[0],n[1]);c[r.id]||(e=!0,t[r.id]=function(){var e=new u.a.FeatureGroup,t=new u.a.LayerGroup,a=new u.a.LayerGroup,n=new u.a.FeatureGroup,r=new u.a.LayerGroup,o=new u.a.FeatureGroup;return t.addTo(e),a.addTo(e),n.addTo(e),r.addTo(e),o.addTo(e),{markers:t,layers:e,offtrackFragmentsLayer:a,offtrackMarkersLayer:n,ontrackFragmentsLayer:r,ontrackMarkersLayer:o,gpx:null}}())})),e&&s({layers:t,trackLayer:i,setGpx:m})}),[c,d,m,i]),o.a.createElement(J.Provider,{value:{layers:c,trackLayer:i,setGpx:m}},t)},it=a(95),ut=a.n(it),st=a(96),mt=a.n(st),ft=a(97),dt=a.n(ft);a(178);delete u.a.Icon.Default.prototype._getIconUrl,u.a.Icon.Default.mergeOptions({iconRetinaUrl:mt.a,iconUrl:ut.a,shadowUrl:dt.a});var pt=function(){var e=[H.applyMiddleware.apply(void 0,[])],t=U.composeWithDevTools.apply(void 0,e);return Object(H.createStore)(V,{},t)}(),gt=function(){return o.a.createElement(S.a,{store:pt},o.a.createElement(s.a,{theme:xe},o.a.createElement(me.a,{className:"App",sx:{fontFamily:"body",fontSize:"body",color:"text"}},o.a.createElement(m.a,null,o.a.createElement(ct,null,o.a.createElement(rt,null),o.a.createElement(ot,null),o.a.createElement(se,null))))))};c.a.render(o.a.createElement(gt,null),document.getElementById("root"))},99:function(e,t,a){e.exports=a(179)}},[[99,1,2]]]);
//# sourceMappingURL=main.1498638a.chunk.js.map