const mongoose = require('mongoose');
const { Schema } = mongoose;
const dashboard_schema = new Schema({
    ceo_dashboard: { type: Array },
    admin_dashboard: { type: Array },
    supervisor_dashboard: { type: Array },
    operations_dashboard: { type: Array },
    sa_dashboard: { type: Array },
    dc_dashboard: { type: Array },
    policy_issuer_dashboard: { type: Array },
    producer_dashboard: { type: Array },
    be_dashboard: { type: Array },
    insurance_company: { type: Array },
    insurance_company_dashboard: { type: Array },
    advertise_with_us: { type: Array },
    newsletter: { type: Array },
    leads: { type: Array },
    chats: { type: Array },
    advertise_with_us: { type: Array },
    complaint: { type: Array },
    user_type_id:{
        type:Schema.Types.ObjectId, ref: 'Admins'
    }
})
module.exports.Dashboard_permission = mongoose.model("Dashboard_permission", dashboard_schema)