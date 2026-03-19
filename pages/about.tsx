import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <div className="max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold text-black dark:text-white">
          关于
        </h1>

        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            这里是LSR的相册，放着一些我的摄影作品  
          </p>
          <p>
            我喜欢拿着相机四处闲逛，记录任何事物  
          </p>
          <p>
            因此如你所见，我的作品没有一个明确的 ⌈ 主题 ⌋   
          </p>
          <p>
            看见，记录，思考，回味，这就是我摄影的全部
          </p>
          <br/>
          <h2 className="mt-6 text-3xl font-semibold text-black dark:text-white">
            装备
          </h2>

          <ul className="list-inside list-disc space-y-2">
            <li>Cannon 5D4 24-70mm</li>
            <li>Cannon 60D 70-300mm 100-400mm 50mm 18-135mm</li>
            <li>好兄弟的Sony A7M3 24-70mm</li>
            <li>好兄弟的Sony α6600 70-180mm</li>
            <li>DJI Action 3</li>
            <li>DJI MINI 4 Pro</li>
            
          </ul>
<br/>

          <h2 className="mt-6 text-3xl font-semibold text-black dark:text-white">
            技术栈
          </h2>

          <p>
            本站使用Next.js构建，部署在Github上，通过EdgeOne加速
          </p>
          <p>
            框架已在<a href="https://github.com/forever218/gallery" style={{ color: 'blue' }}>Github</a>开源
          </p>
          <br/>

          <h2 className="mt-6 text-3xl font-semibold text-black dark:text-white">
            其他问题
          </h2>

          <p>
            为什么图片看起来很模糊？
          </p>
          <p>
            考虑到服务器压力和带宽负载，所有图片均经过数层压缩
          </p>
          <br/>
          <h2 className="mt-6 text-3xl font-semibold text-black dark:text-white">
            政策
          </h2>
          <p>
            本站不会收集您的任何信息
          </p>
          <p>
            所有图片均采用<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" style={{ color: 'blue' }}>CC BY-NC-SA 4.0</a>协议，您可以自由使用，须注明出处
          </p>
          <p>
            严禁用于任何商业、违法用途
          </p>
<br/>
          <h2 className="mt-6 text-3xl font-semibold text-black dark:text-white">
            联系我
          </h2>

          <p>
            如有任何问题、摄影上的交流
          </p>
          <p>
            亦或是约拍、合作，欢迎通过邮箱联系我
          </p>
          <p>
            3316703158@qq.com
          </p>
<br/>
<br/>
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            LSR最后编辑于 2026.3.18  ：）
          </p>
        </div>
      </div>
    </Layout>
  );
}
