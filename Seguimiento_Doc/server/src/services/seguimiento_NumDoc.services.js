import { query } from '../db/db.js';  

export async function obtenerSeguimientoPorNumeroDocumento(numeroDocumento, usuario, tipoDocumento) {
  const sql = `
    WITH rutas AS (
      SELECT
        r.nu_emi AS numero_emision,
        r.nu_doc_emi,
        doc_tipo.cdoc_desdoc AS tipo_documento,
        r.nu_ann AS anio,
        d.co_dep_des AS dependencia_actual,
        dep_des.de_dependencia AS nombre_dependencia_actual,
        TO_CHAR(d.fe_rec_doc, 'HH24:MI:SS') AS hora_recepcion,
        d.fe_rec_doc,
        u.cdes_user AS responsable_recepcion,
        est.de_est AS estado_documento
      FROM
        "IDOSGD_GRA".idosgd.tdtv_remitos r
      JOIN
        "IDOSGD_GRA".idosgd.tdtv_destinos d ON r.nu_emi = d.nu_emi
      LEFT JOIN
        "IDOSGD_GRA".idosgd.rhtm_dependencia dep_des ON d.co_dep_des = dep_des.co_dependencia
      LEFT JOIN
        "IDOSGD_GRA".idosgd.seg_usuarios1 u ON d.co_emp_rec = u.cemp_codemp
      LEFT JOIN
        "IDOSGD_GRA".idosgd.tdtr_estados est ON d.es_doc_rec = est.co_est AND est.de_tab = 'TDTV_DESTINOS'
      LEFT JOIN
        "IDOSGD_GRA".idosgd.si_mae_tipo_doc doc_tipo ON r.co_tip_doc_adm = doc_tipo.cdoc_tipdoc
      WHERE
        r.nu_doc_emi = $1
        AND r.co_use_cre = $2
        AND r.co_tip_doc_adm = $3  -- Ahora este parámetro es dinámico
    ),
    rutas_con_origen AS (
      SELECT
        numero_emision,
        nu_doc_emi,
        tipo_documento,
        anio,
        LAG(nombre_dependencia_actual) OVER (ORDER BY fe_rec_doc) AS dependencia_origen,
        nombre_dependencia_actual AS dependencia_destino,
        hora_recepcion,
        responsable_recepcion,
        estado_documento
      FROM rutas
    )
    SELECT
      numero_emision,
      nu_doc_emi,
      tipo_documento,
      anio,
      COALESCE(dependencia_origen, 'INICIO') AS de_dependencia,
      dependencia_destino AS a_dependencia,
      hora_recepcion,
      responsable_recepcion,
      estado_documento
    FROM rutas_con_origen;
  `;

  try {
    const result = await query(sql, [numeroDocumento, usuario, tipoDocumento]);  
    return result;
  } catch (error) {
    console.error('Error en el servicio de seguimiento:', error);
    throw new Error('Error en la base de datos');
  }
}
