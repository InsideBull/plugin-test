/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
const React = require("react")

exports.onRenderBody = ({setHeadComponents}) => {
    setHeadComponents([
    	<script key='1' src={"//ced.sascdn.com/tag/2044/smart.js"} async />,
    	<script key='2' src="//tagmanager.smartadserver.com/2044/299263/smart.prebid.js" />,
        <script key='3' type="text/jsx" src={"static/sas.js?1342"} async />,
        <script key='4' src="https://r.sascdn.com/video/config.js?nwid=2044" />,
		<script key='5' src="https://r.sascdn.com/video/controller.js?nwid=2044" />
    ]);
};