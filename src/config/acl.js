'use strict'

import Acl from 'acl'
import aclStore from '../helper/acl-store'

const MongodbBackend = Acl.mongodbBackend

export default dbConnection => {
  const backend = new MongodbBackend(dbConnection, 'acl_')
  const acl = new Acl(backend)

  // allow some routes
  const roleRoutes = '/api/role'
  const masterKelasRoutes = '/api/master-kelas'
  const masterGedungRoutes = '/api/master-gedung'
  const masterJamPerkuliahanRoutes = '/api/master-jam-perkuliahan'
  const masterJurusanRoutes = '/api/master-jurusan'
  const masterMataKuliahRoutes = '/api/master-mata-kuliah'
  const masterPerkuliahanRoutes = '/api/master-perkuliahan'
  const presensiDosenRoutes = '/api/presensi-dosen'
  const presensiMahasiswaRoutes = '/api/presensi-mahasiswa'
  const perkuliahanBerjalanRoutes = '/api/perkuliahan-berjalan'
  const userRoutes = '/api/users'

  // Set roles
  acl.allow([
    {
      roles: 'admin',
      allows: [
        ...generateAdminCrudRoute(userRoutes),
        ...generateAdminCrudRoute(roleRoutes),
        ...generateAdminCrudRoute(masterKelasRoutes),
        ...generateAdminCrudRoute(masterGedungRoutes),
        ...generateAdminCrudRoute(masterJamPerkuliahanRoutes),
        ...generateAdminCrudRoute(masterJurusanRoutes),
        ...generateAdminCrudRoute(masterMataKuliahRoutes),
        ...generateAdminCrudRoute(masterPerkuliahanRoutes),
        ...generateAdminCrudRoute(presensiDosenRoutes),
        ...generateAdminCrudRoute(perkuliahanBerjalanRoutes),
        ...generateAdminCrudRoute(presensiMahasiswaRoutes),
        { resources: `${presensiMahasiswaRoutes}/ambil`, permissions: ['put'] },
        { resources: `${presensiMahasiswaRoutes}/report`, permissions: ['get'] }
      ]
    }
  ])

  function generateAdminCrudRoute (routes) {
    return [
      { resources: `${routes}`, permissions: ['*'] },
      { resources: `${routes}/view`, permissions: ['get'] },
      { resources: `${routes}/edit`, permissions: ['put'] },
      { resources: `${routes}/remove`, permissions: ['delete'] }
    ]
  }
  aclStore.acl = acl
}
