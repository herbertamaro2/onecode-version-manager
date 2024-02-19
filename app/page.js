'use client'

import { useState } from "react";
import { FaArrowLeft, FaLock, FaRegFileCode } from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";
import updates from './updates.json'
import procedures from './procedures.json'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


export default function Home() {
  const [filesFrom, setFilesFrom] = useState(null);
  const [fileProcedure, setFileProcedure] = useState('');
  const lastCommit = 'https://gitlab.com/geraldofcastro/jupiter/-/commit/54a85792031e18cb681b957fa82e62c3d910f1fd';
  const stableCommit = 'https://gitlab.com/geraldofcastro/jupiter/-/commit/54a85792031e18cb681b957fa82e62c3d910f1fd';
  const [openLightbox, setOpenLightbox] = useState(false);
  const [image, setImage] = useState('');


  const handleImage = (image) => {
    setImage(image);
    setOpenLightbox(true);
  }

  const handleCloseLightbox = () => {
    setImage('');
    setOpenLightbox(false);
  }

  return (

    <main className="flex min-h-screen flex-col relative pt-5 w-full sm:w-11/12 px-5 sm:px-0 sm:mx-auto">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between pb-10">
        <img
          src="/logo.png"
          alt="Vercel Logo"
          style={{ height: 60 }}
        />
        <h1 className='text-xl sm:text-3xl font-bold text-center sm:text-right'>Gerenciamento de Versão</h1>
      </div>
      <div className="w-full flex flex-col sm:flex-row text-center justify-between bg-gray-100 rounded sm:p-5">
        <p className="text-xl flex flex-col items-center sm:items-start w-auto">
          <span><strong>Estável:</strong> 2024.06.1286-beta</span>
          <a href={stableCommit} target="_blank" className="text-md leading-5 text-blue-500">Commit</a>
        </p>
        <p className="text-xl flex flex-col items-center sm:items-end w-auto">
          <span><strong>Última versão:</strong> 2024.06.1289-beta</span>
          <a href={lastCommit} target="_blank" className="text-md leading-5 text-blue-500">Commit</a>
        </p>

      </div>

      <div className='w-full flex flex-wrap sm:flex-nowrap justify-between pt-10 pb-20 gap-5'>

        <div className="w-full sm:w-4/12 pb-10">
          <h3 className='text-xl font-bold mb-4'>Atualizações</h3>

          <ul area="list" className="divide-y divide-gray-100">
            {updates && updates.map((update, index) => (
              <li key={update.title}
                className={`list-li flex justify-between gap-x-6 py-5 ${filesFrom === String(index) && 'active'}`}
                onClick={() => setFilesFrom(String(index))}>
                <div className="flex min-w-0 gap-x-4">
                  {update.imageUrl ? <img className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={update.imageUrl} alt=""
                    onClick={() => handleImage(update.imageUrl)} /> :
                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={'/noimage.png'} />
                  }
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{update.title}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      <div className="mt-1 flex items-center gap-x-1.5">
                        {update.type === 'BUG' ?
                          <div className="flex-none rounded-full bg-red-500/20 p-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                          </div>
                          :
                          <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          </div>
                        }
                        <span className="text-xs leading-5 text-gray-500">{update.type}</span>
                        {update.taskUrl && <a href={update.taskUrl} target="_blank"
                          className="text-xs leading-5 text-blue-500">ABRIR TAREFA</a>}
                      </div>
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{update.area}</p>
                  <p className="text-xs leading-5 text-gray-500">{update.priority}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full sm:w-4/12 pb-10">
          <h3 className='text-xl font-bold mb-4'>Arquivos alterados</h3>

          {filesFrom ? (
            <ul area="list" className="divide-y divide-gray-100">
              {updates[Number(filesFrom)].affected.map((file, index) => (
                <li key={index}
                  className={`flex list-li justify-between gap-x-6 py-5  ${fileProcedure === file && 'active'}`}
                  onClick={() => setFileProcedure(file)}
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex  items-center gap-5 flex-auto" >
                      <FaRegFileCode size={26} />
                      <p className="text-sm font-semibold leading-6 text-gray-900">{file}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>) : (
            <div className='bg-gray-100 w-full h-full flex items-center justify-center rounded'>
              <span className="flex gap-5 font-bold items-center justify-center"><FaArrowLeft /> Clique ao lado</span>
            </div>
          )}
        </div>

        <div className="w-full sm:w-4/12 pb-10">
          <h3 className='text-xl font-bold mb-4'>Procedimento de Testes</h3>
          {fileProcedure ? (
            <ul area="list" className="divide-y divide-gray-100">
              {procedures.filter(item => item.file === fileProcedure).map((file, index) => (
                file.tasks.map((task, index) => ( // Mapping over tasks
                  <li key={index} className="flex list-li justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex items-center gap-5 flex-auto">
                        <MdOutlineTaskAlt size={26} />
                        <p className="text-sm font-semibold leading-6 text-gray-900">{task}</p>
                      </div>
                    </div>
                  </li>
                ))
              ))}
              <li className="p-3">
                <button disabled className="w-full text-center flex items-center justify-center bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center gap-4 mt-4 mb-4">
                <FaLock /> Realizar Testes</button>
              </li>
            </ul>
          ) : (
            <div className='bg-gray-100 w-full h-full flex items-center justify-center rounded'>
              <span className="flex gap-5 font-bold items-center justify-center"><FaArrowLeft /> Clique ao lado</span>
            </div>
          )}



        </div>
      </div>


      <div className="w-full fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://onecode.com.br"
          target="_blank"
          rel="noopener noreferrer"
        >
          Onecode Brasil{" "}
        </a>
      </div>

      <Lightbox
        open={openLightbox}
        close={() => handleCloseLightbox()}
        slides={[
          { src: image }
        ]}
      />
    </main>
  );
}
