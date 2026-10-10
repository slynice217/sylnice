装修日志文字更新版 - 操作说明

1. Supabase Dashboard -> Authentication -> Users，找到你创建的管理员账号，复制其 UUID/ID。
2. 打开 renovation-logs-setup.sql，把所有 YOUR_ADMIN_USER_UUID 替换为这串 UUID，再将完整 SQL 复制到 Supabase -> SQL Editor 执行。
3. 将压缩包内全部文件上传/提交到 GitHub 仓库 slynice217/sylnice，覆盖同名文件；不要只替换 page.html。
4. 等 GitHub Actions 部署成功后，打开 https://slynice217.github.io/sylnice/，点击“装修日志”。
5. 页面下方会出现“装修日志 · 最新更新”和“管理员入口 · 更新装修日志”。使用现有 Supabase 管理员邮箱和密码登录即可新增、编辑、删除文字日志；访客可以公开阅读。
6. 本版本不提供图片上传入口。原有静态内容、页面布局、导航和首页“简/繁”切换均保留。

Supabase Project URL 已配置为 https://wjoqqwujsebbqnxzoyrg.supabase.co，前端只使用 Publishable key。不要将 service_role / secret key 放进网页或提交到 GitHub。Publishable key 本来就是前端使用的公开 key，数据访问权限由 RLS 策略控制。


留言板说明：index.html 已加入访客留言板，使用 Supabase 的 public.site_comments 表。请确认此前的留言 SQL 已在同一个 Supabase 项目执行，并允许 anon 角色 select/insert；如果尚未创建该表，需先执行创建 site_comments 的 SQL。

语言同步修复：简繁切换状态现在会保存在当前浏览器的 localStorage 中；主页和装修日志页共用同一个状态。切换后打开另一页会继续使用上次选择的简体或繁体。

最终修复说明：留言板现在同时放在 index.html（首页）和 page.html（装修日志页），两个页面使用同一 Supabase site_comments 表。简繁选择由 localStorage 的 sylnice-language 保存；请将解压后的 index.html、page.html 和其他原始资源一起提交到 GitHub Pages 实际发布的分支/目录。