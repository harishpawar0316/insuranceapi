
const headersData = require("./averagerateheaders.json")


function TableHeaders(lobname) {
    try {
        const headers = headersData[lobname] || headersData["all"];
        return `<tr class="table-info">
        ${headers.map(header => `<th scope="col">${header.label}</th>`).join('')}
    </tr>`;
    } catch (error) {
        console.log("error i headers", error)
    }
}

function MotorDataRow(item) {
    try {
        if (item.length > 0) {
            return item.map((val, i) => {
                const comprehensivePlans = val?.comprehensive_plans || [];
                const tplPlans = val?.tpl_plans || [];

                const comprehensivePlanNames = comprehensivePlans.map(c => c.plan_name);
                const tplPlanNames = tplPlans.map(c => c.plan_name);

                const comprehensiveBodyTypes = comprehensivePlans.flatMap(c => c?.body_type?.map(b => b?.body_type_name)) || [];
                const tplBodyTypes = tplPlans.flatMap(c => c?.body_type?.map(b => b?.body_type_name)) || [];

                const comprehensiveRates = comprehensivePlans.flatMap(c => c?.rate?.map(b => b.premium || b.rate)) || [];
                const tplRates = tplPlans.flatMap(c => c?.rate?.map(b => b.premium || b.rate)) || [];
                const comprehensiveLeads = comprehensivePlans.flatMap(c => c?.leads) || [];
                const tplLeads = tplPlans.flatMap(c => c?.leads) || [];
                const filtercomprehensiveRates = comprehensiveRates.filter((item) => {
                    if (!item.includes("%")) {
                        item = +item
                        return item
                    } else {
                        return false
                    }
                })
                const filtertplRates = tplRates.filter((item) => {
                    console.log("item", item)
                    if (typeof item == "string" && !item.includes("%")) {
                        item = +item
                        return item
                    }
                    if (typeof item == "number") {
                        return item
                    }
                    else {
                        return false
                    }
                })
                const comprehensiveAverageRate = filtercomprehensiveRates.reduce((a, b) => {
                    return a + b
                }, 0) / (comprehensiveLeads.length || 1);
                const tplAverageRate = filtertplRates.reduce((a, b) => a + b, 0) / (tplLeads.length || 1);
                const maxLength = Math.max(
                    comprehensivePlanNames.length,
                    tplPlanNames.length,
                    comprehensiveBodyTypes.length,
                    tplBodyTypes.length,
                    comprehensiveRates.length,
                    tplRates.length
                );

                return Array.from({ length: maxLength }).map((_, rowIndex) => (
                    `<tr>
                    ${rowIndex === 0 ? `
                        <td rowspan="${maxLength}">${i + 1}</td>
                        <td rowspan="${maxLength}">${val.company_name || "N/A"}</td>
                    ` : ''}
                    <td>${comprehensivePlanNames[rowIndex] || "N/A"}</td>
                    <td>${tplPlanNames[rowIndex] || "N/A"}</td>
                    <td>${comprehensiveBodyTypes[rowIndex] || "N/A"}</td>
                    <td>${tplBodyTypes[rowIndex] || "N/A"}</td>
                    <td>${comprehensiveRates[rowIndex] || "N/A"}</td>
                    <td>${tplRates[rowIndex] || "N/A"}</td>
                     <td>${comprehensiveAverageRate || "N/A"}</td>
                    <td>${tplAverageRate || "N/A"}</td>
                </tr>`
                )).join('');
            }).join('');
        } else {
            return `<tr><td colSpan="8">No records found</td></tr>`;
        }
    } catch (error) {
        console.log("error in motor ", error)
    }
}
function YachtDataRow(items) {
    try {
        if (items.length > 0) {
            return items.map((val, i) => {
                const comprehensivePlans = val?.comprehensive_plans || [];
                const tplPlans = val?.tpl_plans || [];

                const comprehensivePlanNames = comprehensivePlans.map(c => c.plan_name);
                const tplPlanNames = tplPlans.map(c => c.plan_name);

                const comprehensiveBodyTypes = comprehensivePlans.flatMap(c => c?.yacht_body_type_or_topup?.map(b => b?.yacht_body_type)) || [];
                const tplBodyTypes = tplPlans.flatMap(c => c?.yacht_body_type_or_topup?.map(b => b?.yacht_body_type)) || [];

                const comprehensiveRates = comprehensivePlans.flatMap(c => c?.rate?.map(b => b)) || [];
                const tplRates = tplPlans.flatMap(c => c?.yacht_body_type_or_topup?.map(b => b?.primium)) || [];
                const comprehensiveLeads = comprehensivePlans.flatMap(c => c?.leads) || [];
                const tplLeads = tplPlans.flatMap(c => c?.leads) || [];

                const filterComprehensiveRates = comprehensiveRates.filter((item) => {
                    if (!item.includes("%")) {
                        item = +item;
                        return item;
                    } else {
                        return false;
                    }
                });

                const filterTplRates = tplRates.filter((item) => {
                    if (typeof item === "string" && !item.includes("%")) {
                        item = +item;
                        return item;
                    }
                    if (typeof item === "number") {
                        return item;
                    } else {
                        return false;
                    }
                });

                const comprehensiveAverageRate = filterComprehensiveRates.reduce((a, b) => a + b, 0) / (comprehensiveLeads.length || 1);
                const tplAverageRate = filterTplRates.reduce((a, b) => a + b, 0) / (tplLeads.length || 1);

                const maxLength = Math.max(
                    comprehensivePlanNames.length,
                    tplPlanNames.length,
                    comprehensiveBodyTypes.length,
                    tplBodyTypes.length,
                    comprehensiveRates.length,
                    tplRates.length
                );

                return Array.from({ length: maxLength }).map((_, rowIndex) => (
                    `<tr>
                    ${rowIndex === 0 ? `
                        <td rowspan="${maxLength}">${i + 1}</td>
                        <td rowspan="${maxLength}">${val.company_name || "N/A"}</td>
                    ` : ''}
                    <td>${comprehensivePlanNames[rowIndex] || "N/A"}</td>
                    <td>${tplPlanNames[rowIndex] || "N/A"}</td>
                    <td>${comprehensiveBodyTypes[rowIndex] || "N/A"}</td>
                    <td>${tplBodyTypes[rowIndex] || "N/A"}</td>
                    <td>${comprehensiveRates[rowIndex] || "N/A"}</td>
                    <td>${tplRates[rowIndex] || "N/A"}</td>
                    <td>${comprehensiveAverageRate || "N/A"}</td>
                    <td>${tplAverageRate || "N/A"}</td>
                </tr>`
                )).join('');
            }).join('');
        } else {
            return `<tr><td colSpan="10">No records found</td></tr>`;
        }
    } catch (error) {
        console.log("error in yacht", error);
    }
}

function TravelDataRow(items) {
    try {
        return items?.map((company, companyIndex) =>
            company?.plans?.map((plan, planIndex) =>
                plan?.travel_plan_prices?.map((price, priceIndex) =>
                    price?.no_of_days_or_topup?.map((dayRange, dayRangeIndex) => {
                        const showCompanyName = planIndex === 0 && priceIndex === 0 && dayRangeIndex === 0;
                        const showPlanName = priceIndex === 0 && dayRangeIndex === 0;
                        const showCoverType = dayRangeIndex === 0;

                        const companyRowSpan = company?.plans?.reduce((total, plan) =>
                            total + (plan?.travel_plan_prices?.reduce((totalPrices, price) =>
                                totalPrices + (price?.no_of_days_or_topup?.length || 0), 0) || 0), 0) || 1;

                        const planRowSpan = plan?.travel_plan_prices?.reduce((totalPrices, price) =>
                            totalPrices + (price?.no_of_days_or_topup?.length || 0), 0) || 1;

                        const priceRowSpan = price?.no_of_days_or_topup?.length || 1;

                        return `
                        <tr>
                            ${showCompanyName ? `<td rowspan="${companyRowSpan}">${companyIndex + 1}</td><td rowspan="${companyRowSpan}">${company?.company_name ?? 'N/A'}</td>` : ''}
                            ${showPlanName ? `<td rowspan="${planRowSpan}">${plan?.plan_name ?? 'N/A'}</td>` : ''}
                            ${showCoverType ? `<td rowspan="${priceRowSpan}">${price?.cover_type_id?.travel_cover_type ?? 'N/A'}</td>` : ''}
                            <td>${dayRange?.number_of_daysMin ?? 'N/A'} - ${dayRange?.number_of_daysMax ?? 'N/A'}</td>
                            <td>${dayRange?.travel_premium ?? 'N/A'}</td>
                        </tr>`;
                    }).join('')
                ).join('')
            ).join('')
        ).join('') || `<tr><td colspan="6">No Data Available</td></tr>`;
    } catch (error) {
        console.log("error in travel", error)
    }
}
function HomeDataRow(items) {
    try {
        if (items.length > 0) {
            return items.map((val, i) => {
                const planNames = val?.plans?.map(c => c.plan_name) || [];
                const propertyTypes = val?.plans?.flatMap(c => c?.property_type_id?.map(b => b?.label)) || [];
                const buildingValues = val?.plans?.flatMap(c => c?.building_value_or_topup?.map(b => b.rate)) || [];
                const Leads = buildingValues.flatMap(c => c?.leads) || [];
                const filtercomprehensiveRates = buildingValues.filter((item) => {
                    if (!item.includes("%")) {
                        item = +item
                        return item
                    } else {
                        return false
                    }
                })

                const AverageRate = filtercomprehensiveRates.reduce((a, b) => {
                    return a + b
                }, 0) / (Leads.length || 1);
                const maxLength = Math.max(planNames.length, propertyTypes.length, buildingValues.length);

                return Array.from({ length: maxLength }).map((_, rowIndex) => `
                <tr>
                    ${rowIndex === 0 ? `<td rowspan="${maxLength}">${i + 1}</td><td rowspan="${maxLength}">${val.company_name || "N/A"}</td>` : ''}
                    <td>${planNames[rowIndex] || ""}</td>
                    <td>${propertyTypes[rowIndex] || ""}</td>
                    <td>${buildingValues[rowIndex] || ""}</td>
                     <td>${AverageRate || "N/A"}</td>
                </tr>`).join('');
            }).join('');
        } else {
            return `<tr><td colspan="8">No records found</td></tr>`;
        }
    } catch (error) {
        console.log("error in home", error)
    }
}
function MedicalDataRow(items) {
    try {
        if (items.length > 0) {
            return items.map((val, i) => {
                const planNames = val?.plans?.map(plan => plan.plan_name) || [];
                const rates = val?.plans?.flatMap(plan => plan.rates.map(rate => ({
                    malePremium: rate.primiumArray?.map(p => p.malePre).join(', ') || "N/A",
                    femalePremium: rate.primiumArray?.map(p => p.femalePer).join(', ') || "N/A",
                    marriedFemalePremium: rate.primiumArray?.map(p => p.marrideFemalePre).join(', ') || "N/A",
                }))) || [];

                const maxLength = Math.max(planNames.length, rates.length);

                return Array.from({ length: maxLength }).map((_, rowIndex) => `
                <tr>
                    ${rowIndex === 0 ? `<td rowspan="${maxLength}">${i + 1}</td><td rowspan="${maxLength}">${val.company_name || "N/A"}</td>` : ''}
                    <td>${planNames[rowIndex] || ""}</td>
                    <td>${rates[rowIndex]?.malePremium || ""}</td>
                    <td>${rates[rowIndex]?.femalePremium || ""}</td>
                    <td>${rates[rowIndex]?.marriedFemalePremium || ""}</td>
                </tr>`).join('');
            }).join('');
        } else {
            return `<tr><td colspan="9">No records found</td></tr>`;
        }
    } catch (error) {
        console.log("error in medical", error)
    }
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function HighestRateModalBody(element, lobname) {
    try {
        return `
           <li>
                        <div>
                            <strong>Line Of Business :</strong>
                            <span>
                              ${" "} ${capitalizeFirstLetter(lobname)}
                            </span>
                        </div>
        <table class="table table-bordered table-responsive">
        <thead class="thead-dark">
            ${TableHeaders(lobname)}
        </thead>
        <tbody>
          
            ${element || "No Modal"}
           
        </tbody>
    </table>
      </li>
    `;
    } catch (error) {
        console.log("error in tably mpdal", error)
    }
}

// Similarly, define other functions: YachtDataRow, TravelDataRow, HomeDataRow, MedicalDataRow

async function AvarageRateTable(data) {
    try {
        if (data && data.length > 0) {
            const results = await Promise.all(data.map(async (property) => {
                if (property && Object.keys(property).length > 0) {
                    const rows = await Promise.all(Object.keys(property).map(async (lobname) => {
                        const item = property[lobname];
                        if (item && Array.isArray(item) && item.length > 0) {
                            let body = '';
                            switch (lobname) {
                                case "motor":
                                    body = await HighestRateModalBody(MotorDataRow(item), lobname);
                                    break;
                                case "yacht":
                                    body = await HighestRateModalBody(YachtDataRow(item), lobname);
                                    break;
                                case "travel":
                                    body = await HighestRateModalBody(TravelDataRow(item), lobname);
                                    break;
                                case "home":
                                    body = await HighestRateModalBody(HomeDataRow(item), lobname);
                                    break;
                                case "medical":
                                    body = await HighestRateModalBody(MedicalDataRow(item), lobname);
                                    break;
                                // case "all":
                                //     body = await Promise.all([
                                //         HighestRateModalBody(MotorDataRow(item), lobname),
                                //         HighestRateModalBody(YachtDataRow(item), lobname),
                                //         HighestRateModalBody(TravelDataRow(item), lobname),
                                //         HighestRateModalBody(HomeDataRow(item), lobname),
                                //         HighestRateModalBody(MedicalDataRow(item), lobname)
                                //     ]).then((results) => {
                                //         console.log("results", results)
                                //         results.join('')
                                //     });

                                //     break;
                                default:
                                    body = null;
                            }

                            return body ? body : '';
                        } else {
                            return '';
                        }
                    }));
                    return `<ul>${rows.join('')}</ul>`
                } else {
                    return `<tr><td colspan="100%">No records found</td></tr>`;
                }
            }));
            return results.join('');
        } else {
            console.log("rows not found");
            return '';
        }
    } catch (error) {
        console.log("error in AllRowsAndTable", error);
        throw error;
    }
}



module.exports = { AvarageRateTable };
