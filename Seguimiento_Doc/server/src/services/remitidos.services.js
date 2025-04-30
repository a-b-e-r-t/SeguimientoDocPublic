import { query } from '../db/db.js';  

export async function obtenerResumenPorExpediente(expediente) {
  const sql = `
    SELECT 
      r.nu_emi,
      dep_emisora.de_dependencia AS co_dep_emi_ref,  -- Se reemplaza co_dep_emi_ref con el nombre de la dependencia
      dep_destino.de_dependencia AS ti_emi_des,  -- Se reemplaza ti_emi_des con el nombre de la dependencia
      d.co_emp_des,  -- Se deja co_emp_des tal cual
      u.cdes_user
    FROM "IDOSGD_GRA".idosgd.tdtx_remitos_resumen r
    LEFT JOIN "IDOSGD_GRA".idosgd.tdtv_destinos d ON r.nu_emi = d.nu_emi
    LEFT JOIN "IDOSGD_GRA".idosgd.seg_usuarios1 u ON d.co_emp_des = u.cemp_codemp
    LEFT JOIN "IDOSGD_GRA".idosgd.rhtm_dependencia dep_emisora 
      ON dep_emisora.co_dependencia = r.co_dep_emi_ref  -- Buscar el nombre de la dependencia usando co_dep_emi_ref
    LEFT JOIN "IDOSGD_GRA".idosgd.rhtm_dependencia dep_destino 
      ON dep_destino.co_dependencia = r.ti_emi_des  -- Buscar el nombre de la dependencia usando ti_emi_des
    WHERE r.nu_expediente = $1
  `;

  try {
    const result = await query(sql, [expediente]); 
    //console.log('Resultado de la consulta:', result); // Log para verificar el resultado
    return result; 
  } catch (error) {
    console.error('Error en el servicio de remitos:', error);
    throw new Error('Error en la base de datos');
  }
}
