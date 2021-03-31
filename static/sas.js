/** @jsx React.DOM */
var sas = sas || {};
sas.cmd = sas.cmd || []; 
sas.cmd.push(function() {
      sas.setup({ networkid: 2044, domain: "https://www8.smartadserver.com", async: true, renderMode:2 });
});
sas.cmd.push(function() {
      sas.call("onecall", {
             siteId: 299263,
             pageId: 1096614, 
             formats: [
             { id: 43791 }
             ,{ id: 44149, tagId : "WEB_HABILLAGE" }
             ,{ id: 44152, tagId : "WEB_INTERSTITIEL" }
             ,{ id: 79433, tagId : "WEB_LOGO" }
             ,{ id: 79409, tagId : "WEB_MBAN_ATF0" }
             ,{ id: 79421, tagId : "WEB_MBAN_BTF" }
             ,{ id: 79425, tagId : "WEB_MPAVE_ATF0" }
             ,{ id: 79431, tagId : "WEB_MPAVE_BTF" }
             ],
             target: 'rubrique_id:5399;article_id:755600;'
     });
});