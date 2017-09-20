<template>
	<footer class="platform-footer">
		<el-row class="footer-info">
			<el-col :span="24">
				<p class="">
					<a href="/know/agreement">网站协议</a><span>|</span><a href="/feedback">常见问题</a><span>|</span><a href="/know/contactUs">联系我们</a><span>|</span><a href="/know/aboutUs">关于我们</a>
				</p>
				<p>
					Copyright © 2017 xxxx司（eGongSi.cn） All Rights Reserved. 
				</p>
				<p>
					京ICP备15060737号
				</p>
			</el-col>
		</el-row>
	</footer>
</template>
<style scoped lang="scss">
/*尾部样式*/
.platform-footer{
    border-top: 2px solid #c7161c;
    background-color: #eee;
    text-align: center;
    .footer-info{
        margin-top: 20px;
        span{
            margin-right: 25px;
            margin-left:25px;
        }
    } 
}
a{
    cursor: pointer;
    color: #7d7d7d;
    text-decoration: none;
}
a:hover{
    color: #c7161c;
}
</style>
