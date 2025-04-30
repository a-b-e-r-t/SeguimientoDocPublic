
import { query } from '../db/db.js';  

export async function obtenerResumenPorExpediente(expediente) {
  const sql = `
    SELECT r.nu_emi,
          r.co_dep_emi_ref,
          r.ti_emi_des,
          d.co_emp_des,
          u.cdes_user
    FROM "IDOSGD_GRA".idosgd.tdtx_remitos_resumen r
    LEFT JOIN "IDOSGD_GRA".idosgd.tdtv_destinos d ON r.nu_emi = d.nu_emi
    LEFT JOIN "IDOSGD_GRA".idosgd.seg_usuarios1 u ON d.co_emp_des = u.cemp_codemp
    WHERE r.nu_expediente = $1
  `;
  try {
    const result = await query(sql, [expediente]); 
    return result;  
  } catch (error) {
    console.error('Error en el servicio de remitos:', error);
    throw error;  
  }
}
