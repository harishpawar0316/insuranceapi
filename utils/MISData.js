
const headersData = require("./headers.json")
const PolicyTypeName = (data, type) => {
    try {
        const policytype = type.toLowerCase();
        const policyMap = {
            motor: 'policy_type_name',
            travel: 'travel_insurance_for',
            medical: 'medical_plan_type',
            yacht: 'policy_type_name',
            home: 'home_plan_type'
        };
        return data && data[policyMap[policytype]] ? data[policyMap[policytype]] : "-";
    } catch (error) {
        console.error(error);
        return "-";
    }
};
// Function to count occurrences of each supervisor_id
function countAgents(leads, name, startIndex) {
    const agentName = leads[startIndex][name] ? leads[startIndex][name]["name"] : '-';
    let count = 0;

    for (let i = startIndex; i < leads.length; i++) {
        const currentAgentName = leads[i][name] ? leads[i][name]["name"] : '-';
        if (currentAgentName === agentName) {
            count++;
        } else {
            break;
        }
    }

    return count;
};
function countSupervisors(leads, name, startIndex) {
    const supervisorName = leads[startIndex][name] ? leads[startIndex][name]["name"] : '-';
    let count = 0;

    for (let i = startIndex; i < leads.length; i++) {
        const currentSupervisorName = leads[i][name] ? leads[i][name]["name"] : '-';
        if (currentSupervisorName === supervisorName) {
            count++;
        } else {
            break;
        }
    }

    return count;

}
function AgentrowsPanHook(lead, name, pIndex, arr) {
    try {

        const agentName = Object.keys(lead[pIndex][name]).length > 0 ? lead[pIndex][name]["name"] : '-';
        const agentRowspan = countAgents(lead, name, pIndex); // Assuming this function is defined as above
        const isFirstAgent = pIndex === 0 || (arr[pIndex - 1][name] ? arr[pIndex - 1][name].name !== agentName : true);
        if (isFirstAgent) {
            return `<td rowspan="${agentRowspan}">${agentName}</td>`;
        }

        return '';
    } catch (error) {
        console.log("AgentrowsPanHook", error);
        return '';
    }
}
function SupervisorrowsPanHook(lead, name, pIndex, arr) {
    const supervisorName = lead[pIndex][name] ? lead[pIndex][name]["name"] : '-';
    // Get the rowspan based on consecutive occurrences of the same agent name
    const supervisorRowspan = countSupervisors(lead, name, pIndex);
    // Only show the agent name in the first occurrence
    const isFirstSupervisor = pIndex === 0 || arr[pIndex - 1][name]?.name !== supervisorName;
    if (isFirstSupervisor) {
        return `<td rowspan="${supervisorRowspan}">${supervisorName}</td>`;
    }
    return '';
}



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
            return items.map((val, i) => `
            <tr>
                <td>${i + 1}</td>
                <td>${val?.comprehensive_plans?.map(c => c.plan_name).join(",") || "N/A"}</td>
                <td>${val?.tpl_plans?.map(c => c.plan_name).join(",") || "N/A"}</td>
                <td>${val?.comprehensive_plans.length > 0 ? val?.comprehensive_plans.map(c => c?.yacht_body_type_or_topup.map(b => b?.yacht_body_type).join(", ")).join(", ") : "N/A"}</td>
                <td>${val?.tpl_plans.length > 0 ? val?.tpl_plans.map(c => c?.yacht_body_type_or_topup.map(b => b?.yacht_body_type).join(", ")).join(", ") : "N/A"}</td>
                <td>${val.company_name || "N/A"}</td>
                <td>${val?.comprehensive_plans.length > 0 ? val?.comprehensive_plans.map(c => c?.rate.map(b => b).join(", ")).join(", ") : "N/A"}</td>
                <td>${val?.tpl_plans.length > 0 ? val?.tpl_plans.map(c => c?.yacht_body_type_or_topup.map(b => b?.primium).join(", ")).join(", ") : "N/A"}</td>
            </tr>
        `).join('');
        } else {
            return `<tr><td colspan="8">No records found</td></tr>`;
        }
    } catch (error) {
        console.log("error in yacht", error)
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

                const maxLength = Math.max(planNames.length, propertyTypes.length, buildingValues.length);

                return Array.from({ length: maxLength }).map((_, rowIndex) => `
                <tr>
                    ${rowIndex === 0 ? `<td rowspan="${maxLength}">${i + 1}</td><td rowspan="${maxLength}">${val.company_name || "N/A"}</td>` : ''}
                    <td>${planNames[rowIndex] || ""}</td>
                    <td>${propertyTypes[rowIndex] || ""}</td>
                    <td>${buildingValues[rowIndex] || ""}</td>
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

async function HighestLowestRateTable(data) {
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



module.exports = { PolicyTypeName, HighestLowestRateTable, AgentrowsPanHook, SupervisorrowsPanHook };
