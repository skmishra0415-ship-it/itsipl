// Editorial data for non-home pages. Partner identity/logo mapping stays in technology-partners.mjs.
// Capabilities checked against these official sources on 2026-09-30.
export const sources = {
  sophosEndpoint: ['Sophos Endpoint', 'https://www.sophos.com/en-us/products/endpoint-security'],
  sophosFirewall: ['Sophos Firewall', 'https://www.sophos.com/en-us/products/next-gen-firewall'],
  paloFirewall: ['Palo Alto Networks NGFW', 'https://www.paloaltonetworks.com/network-security/next-generation-firewall'],
  prisma: ['Prisma Access administration overview', 'https://docs.paloaltonetworks.com/prisma-access/administration/prisma-access-overview'],
  falcon: ['CrowdStrike endpoint security', 'https://www.crowdstrike.com/en-us/platform/endpoint-security/'],
  central: ['ManageEngine Endpoint Central', 'https://www.manageengine.com/products/desktop-central/'],
  endpointDlp: ['ManageEngine Endpoint DLP Plus', 'https://www.manageengine.com/endpoint-dlp/'],
  opmanager: ['ManageEngine OpManager', 'https://www.manageengine.com/network-monitoring/'],
  servicedesk: ['ManageEngine ServiceDesk Plus', 'https://www.manageengine.com/products/service-desk/'],
  commvault: ['Commvault Backup & Recovery', 'https://www.commvault.com/platform/backup-and-recovery'],
  druva: ['Druva platform overview', 'https://www.druva.com/products/resilience-cloud/platform-overview'],
  netskopeDlp: ['Netskope One DLP', 'https://www.netskope.com/products/data-loss-prevention'],
  netskopeAccess: ['Netskope One Private Access', 'https://www.netskope.com/products/private-access'],
  forcepoint: ['Forcepoint DLP documentation', 'https://help.forcepoint.com/docs/Tech_Pubs/DLP/DLP.html'],
  forcepointWeb: ['Forcepoint Web Security', 'https://www.forcepoint.com/product/secure-web-gateway-swg']
};

export const partnerContent = {
  sophos: {
    headline: 'Endpoint and network protection, chosen around your team.',
    intro: 'Sophos offers endpoint and firewall security. ITSIPL helps you narrow the scope around your devices, network and the people who will operate the tools.',
    fit: ['Businesses reviewing protection for employee computers and servers.', 'Teams refreshing a branch firewall or considering endpoint and network controls together.', 'Organizations that need to distinguish a software purchase from separately scoped operational support.'],
    products: [
      ['Protect computers and servers', 'Sophos Endpoint', 'Endpoint threat protection; assess detection and response requirements separately when selecting the subscription.', 'sophosEndpoint'],
      ['Control traffic between networks', 'Sophos Firewall', 'Network security in hardware, virtual and cloud deployment options. Size the design for inspected traffic.', 'sophosFirewall']
    ],
    strengths: ['An endpoint-and-firewall shortlist can simplify the discussion when both controls are being refreshed.', 'Different firewall deployment choices allow evaluation against physical sites and virtual environments.'],
    considerations: ['Check the supported operating systems and agent coexistence before replacing existing endpoint software.', 'Measure firewall traffic with the security features you plan to enable; raw throughput alone is insufficient.', 'Agree who reviews detections and who can approve containment actions. A product licence alone does not provide an ITSIPL monitoring service.'],
    cost: 'Count endpoints and servers separately. For firewalls, include appliance or virtual sizing, resilience requirements and security subscriptions; confirm what each bundle includes.',
    related: ['endpoint-security', 'network-security'], alternatives: ['crowdstrike', 'palo-alto-networks'],
    prepare: 'Share device counts, operating systems, current endpoint licences, firewall model, internet bandwidth and renewal dates.'
  },
  'palo-alto-networks': {
    headline: 'Network security for sites, cloud and remote access.',
    intro: 'Palo Alto Networks offers next-generation firewalls and Prisma Access. Start with where your applications and users connect, then decide which deployment belongs in your environment.',
    fit: ['Organizations planning network segmentation or a firewall refresh.', 'Distributed businesses evaluating cloud-delivered security for branches and mobile users.', 'Teams that can define routing, identity and change-management requirements before rollout.'],
    products: [
      ['Inspect and control network traffic', 'Next-Generation Firewalls', 'Hardware and virtual firewall options for network security across different deployment environments.', 'paloFirewall'],
      ['Secure distributed access', 'Prisma Access', 'Cloud-delivered security for remote networks and mobile users.', 'prisma']
    ],
    strengths: ['Physical and virtual choices let network security follow the location of the workload.', 'Prisma Access is an option when the requirement is distributed access rather than an appliance at every point.'],
    considerations: ['Document routing, identity-provider integration, encrypted traffic and logging requirements.', 'Validate latency and application behavior from actual user locations before committing to an access design.', 'Check the security subscriptions, management components and retention needed; do not assume all capabilities come with the base purchase.'],
    cost: 'Firewall sizing, resilience pairs, security subscriptions and management requirements affect scope. For remote access, include users, sites, capacity and the applicable subscription metric.',
    related: ['network-security', 'secure-access', 'it-infrastructure'], alternatives: ['sophos', 'netskope'],
    prepare: 'Share your network diagram, site and remote-user counts, current firewalls, application locations and identity platform.'
  },
  crowdstrike: {
    headline: 'Endpoint protection with an operational response plan.',
    intro: 'CrowdStrike Falcon provides endpoint protection and detection and response capabilities. ITSIPL helps frame the purchase around both prevention needs and the team responsible for investigating alerts.',
    fit: ['Organizations assessing endpoint threat protection across distributed devices.', 'Security teams that need investigation and response capabilities in addition to prevention.', 'Businesses reviewing an existing endpoint agent and planning a controlled replacement.'],
    products: [
      ['Prevent endpoint threats', 'Falcon endpoint protection', 'Endpoint protection on the Falcon platform for malicious activity on devices.', 'falcon'],
      ['Investigate and respond', 'Falcon endpoint detection and response', 'Detection and response capabilities for endpoint investigations; confirm the capabilities included in the proposed package.', 'falcon']
    ],
    strengths: ['Prevention and investigation can be considered within one endpoint platform.', 'The platform approach gives a starting point for evaluating additional requirements without treating every module as mandatory.'],
    considerations: ['Verify operating-system versions, server workloads and coexistence with your present agents.', 'Define who triages alerts, investigates incidents and authorizes device isolation.', 'Check data retention, required integrations and module entitlements in the proposal. Any vendor-operated service is a separate scope from ITSIPL services.'],
    cost: 'Device and server counts, selected modules, retention and any separately ordered service affect the quote. Identify which existing licences would be replaced and when they expire.',
    related: ['endpoint-security', 'cybersecurity'], alternatives: ['sophos'],
    prepare: 'Share workstation and server counts, operating systems, existing endpoint software, incident-response ownership and renewal timing.'
  },
  manageengine: {
    headline: 'Practical tools for managing devices, data and IT work.',
    intro: 'ManageEngine offers separate products for endpoint administration, endpoint data leakage controls, monitoring and service management. ITSIPL helps identify the tool for the job instead of assuming you need the whole portfolio.',
    fit: ['IT teams organizing patching and device administration.', 'Businesses addressing sensitive files leaving employee computers.', 'Operations teams replacing scattered monitoring or informal support requests.'],
    products: [
      ['Manage employee devices', 'Endpoint Central', 'Endpoint administration including patching, software deployment and inventory.', 'central'],
      ['Control sensitive data on devices', 'Endpoint DLP Plus', 'Sensitive-file discovery, classification and controls on endpoint data movement.', 'endpointDlp'],
      ['Observe infrastructure', 'OpManager', 'Network and server availability and performance monitoring.', 'opmanager'],
      ['Organize service requests', 'ServiceDesk Plus', 'Service management with ticketing and edition-dependent asset and change-management capabilities.', 'servicedesk']
    ],
    strengths: ['You can scope a device, monitoring or service-desk requirement as its own purchase.', 'Operational tools can be evaluated against concrete tasks such as patch deployment or handling a support request.'],
    considerations: ['Match each product and edition to its own licensing metric; a technician count is different from a managed-device count.', 'Check cloud versus on-premises availability for the specific product and integration you need.', 'Endpoint administration, DLP and threat detection address different problems. Do not substitute one solely because it shares a vendor name.'],
    cost: 'Count managed endpoints, monitored devices, technicians or assets according to the product. Check editions, add-ons and the hosting requirements of on-premises deployments.',
    related: ['data-loss-prevention', 'it-infrastructure', 'managed-services'], alternatives: ['netskope', 'forcepoint'],
    prepare: 'Share your device inventory, patch process, service-desk workflow, monitoring estate and the data transfers you want to control.'
  },
  commvault: {
    headline: 'Plan recovery around the workloads your business depends on.',
    intro: 'Commvault provides backup and recovery across on-premises, cloud and SaaS workloads. ITSIPL helps turn workload and recovery requirements into a purchase scope that can be checked before delivery.',
    fit: ['Organizations with a mixed estate of applications, databases and virtual machines.', 'Teams consolidating backup requirements across several environments.', 'Businesses that need to define restore priorities and test responsibilities.'],
    products: [
      ['Recover business workloads', 'Commvault Cloud Backup & Recovery', 'Backup and recovery for supported on-premises and cloud workloads.', 'commvault'],
      ['Protect SaaS application data', 'Commvault SaaS backup options', 'Backup coverage for supported SaaS applications, including Microsoft 365. Confirm application-level restore requirements.', 'commvault']
    ],
    strengths: ['Broad workload coverage is useful when several backup requirements need one evaluation.', 'Deployment and storage choices can be assessed against recovery location and infrastructure constraints.'],
    considerations: ['Check the exact application version and restore method against the supported-workload documentation.', 'Define acceptable data loss and downtime per application; a completed backup is not a completed recovery test.', 'Include storage, permissions, isolated recovery access and the operational work needed to maintain the design.'],
    cost: 'Protected capacity, workload or user metrics, retention, storage location and recovery requirements affect sizing. Include deployment infrastructure and testing effort in the overall budget.',
    related: ['data-protection', 'it-infrastructure'], alternatives: ['druva'],
    prepare: 'Share workloads and versions, data volumes and growth, retention requirements, backup windows and target recovery times.'
  },
  druva: {
    headline: 'Cloud-delivered backup, assessed against real restore needs.',
    intro: 'Druva offers a SaaS-based backup and resilience platform. ITSIPL helps evaluate whether cloud-delivered protection fits your workloads, connectivity, recovery objectives and purchasing model.',
    fit: ['Teams considering a cloud service instead of operating backup infrastructure themselves.', 'Organizations reviewing protection for SaaS applications or distributed employee data.', 'Businesses checking cloud backup against data-location and recovery requirements.'],
    products: [
      ['Recover SaaS and employee data', 'Druva SaaS and endpoint backup', 'Backup options for supported SaaS applications and endpoint data.', 'druva'],
      ['Protect data-center and cloud workloads', 'Druva hybrid and cloud backup', 'Cloud-delivered protection for supported data-center and public-cloud workloads.', 'druva']
    ],
    strengths: ['SaaS delivery is relevant when reducing self-managed backup infrastructure is a priority.', 'Several workload categories can be evaluated within a cloud-delivered backup approach.'],
    considerations: ['Validate supported workloads, data residency, administrative access and identity requirements.', 'Test initial backup and restore transfer times over your actual links.', 'Check retention, consumption assumptions and recovery destinations. SaaS delivery does not remove your responsibility for recovery planning.'],
    cost: 'Protected users, workloads or capacity depend on the chosen offering. Ask how retention, data growth, subscription commitments and recovery-related charges are treated.',
    related: ['data-protection'], alternatives: ['commvault'],
    prepare: 'Share SaaS tenants, endpoint counts, workloads, data volumes, available bandwidth, preferred regions and retention needs.'
  },
  netskope: {
    headline: 'Protect cloud data and make private access more deliberate.',
    intro: 'Netskope offers data loss prevention and private application access. ITSIPL helps separate the need to control sensitive data from the need to connect users to internal applications.',
    fit: ['Organizations assessing sensitive information shared through cloud applications.', 'Teams evaluating policy controls across web, cloud and endpoint channels.', 'Businesses reviewing how remote users reach private applications.'],
    products: [
      ['Reduce sensitive-data leakage', 'Netskope One DLP', 'Data loss prevention across supported cloud, web, email and endpoint channels.', 'netskopeDlp'],
      ['Connect users to private applications', 'Netskope One Private Access', 'Zero trust network access to private applications.', 'netskopeAccess']
    ],
    strengths: ['Cloud-oriented data controls are relevant to businesses whose working files move through SaaS applications.', 'Private access can be scoped around the applications users need rather than broad network access.'],
    considerations: ['Identify required cloud applications, traffic steering and managed versus unmanaged devices.', 'Check which channels and operating systems the proposed DLP entitlement covers.', 'Pilot data classifiers and private-application access with real users; false positives, latency and exception handling matter.'],
    cost: 'Users, channel coverage, selected subscriptions, application-access scope and support affect the purchase. Include traffic-steering, identity and policy-rollout effort.',
    related: ['data-loss-prevention', 'secure-access'], alternatives: ['forcepoint', 'manageengine', 'palo-alto-networks'],
    prepare: 'Share SaaS applications, sensitive-data types, user locations, endpoint ownership, identity provider and private application list.'
  },
  forcepoint: {
    headline: 'Data leakage controls built around how information moves.',
    intro: 'Forcepoint provides data loss prevention and web security products. ITSIPL helps you identify the data, channels and operating responsibilities that should drive the scope.',
    fit: ['Businesses with sensitive documents moving between users, endpoints and communication channels.', 'Teams that need a defined DLP policy and incident-review process.', 'Organizations assessing web security alongside data controls.'],
    products: [
      ['Prevent unauthorized data movement', 'Forcepoint DLP', 'Policy-based controls for sensitive data across supported endpoint and network channels.', 'forcepoint'],
      ['Control web traffic', 'Forcepoint Web Security', 'Web traffic security with integration options for Forcepoint DLP.', 'forcepointWeb']
    ],
    strengths: ['A data-focused evaluation can address several leakage paths rather than only removable media.', 'Related web controls can be assessed where web traffic is a significant data channel.'],
    considerations: ['Confirm endpoint operating systems, supported applications and channel coverage for the chosen deployment.', 'Plan ownership for policy tuning, incident review and approved business exceptions.', 'Start with observation and a controlled pilot before broad blocking; classification quality affects everyday work.'],
    cost: 'Users or endpoints, protected channels, selected components and deployment model affect licensing and infrastructure. Include policy design, rollout and the agreed support scope.',
    related: ['data-loss-prevention', 'cybersecurity'], alternatives: ['netskope', 'manageengine'],
    prepare: 'Share sensitive-data examples without sending confidential content, leakage channels, endpoint estate and policy-review responsibilities.'
  }
};

export const solutions = [
  {
    id:'cybersecurity', name:'Cyber Security', headline:'Choose security controls around the risks you need to reduce.',
    intro:'A device infection, a weak network boundary and a sensitive file sent to the wrong place are different problems. ITSIPL helps you identify the gap before selecting a product or replacing a working system.',
    requirements:['List the business applications and information you need to protect.', 'Document existing endpoint tools, firewalls, identity systems and licences.', 'Decide which incidents your team can investigate and which require external assistance.', 'Prioritize the largest gaps within the available budget and renewal cycle.'],
    options:[['sophos',0],['crowdstrike',0],['palo-alto-networks',0],['netskope',0],['forcepoint',0]],
    decision:'Begin with one defined control objective. Evaluate endpoint products for endpoint threats, network products for traffic control, and DLP for sensitive-data movement. Combine controls where the requirements justify them; do not rank unrelated products against one another.',
    budget:'Allow for prevention and investigation features, log retention, integrations and the people needed to operate the tools. Reuse suitable existing systems and make replacement dates explicit.',
    acceptance:['A written list of protected assets and excluded systems.', 'A pilot using representative devices and business applications.', 'Clear ownership of alerts, exceptions and escalation.'],
    related:['endpoint-security','network-security','data-loss-prevention','secure-access'],
    distinction:'Security controls reduce exposure. Backup and recovery address getting data and services back after disruption; include both where the business needs them.'
  },
  {
    id:'data-protection', name:'Backup & Disaster Recovery', service:'Data Protection', headline:'Make recovery a requirement before it becomes an emergency.',
    intro:'Deleted files, failed systems or a disruptive attack can leave teams unable to work. Backup keeps recoverable copies; disaster recovery also plans how applications, access and dependencies will run again.',
    requirements:['Inventory applications, virtual machines, databases, SaaS data and supported versions.', 'Set recovery point objectives: how much recent data could the business afford to lose?', 'Set recovery time objectives: how long could each service be unavailable?', 'Define retention, storage location, data growth, administrator access and restore-test frequency.'],
    options:[['commvault',0],['commvault',1],['druva',0],['druva',1]],
    decision:'Compare support for the same workloads and restore scenarios. Review existing hypervisors, storage, SaaS tenants and identity dependencies. Choose the delivery model and recovery destination that your team can realistically operate.',
    budget:'Size protected capacity or users, retention and growth. Include storage, cloud connectivity, recovery infrastructure, subscriptions, implementation and support. Ask which restore or consumption charges apply.',
    acceptance:['A successful restore of representative files and an application.', 'A documented recovery sequence with business owners and dependencies.', 'Measured recovery time and a plan for regularly repeating the test.'],
    related:['data-loss-prevention','it-infrastructure','managed-services'],
    distinction:'Backup and disaster recovery restore availability. They do not substitute for DLP controls that restrict sensitive files being copied, uploaded or sent out.'
  },
  {
    id:'it-infrastructure', name:'IT Infrastructure', headline:'Plan capacity, connectivity and operations together.',
    intro:'Slow applications and fragile connectivity often start with mismatched capacity or poorly understood dependencies. ITSIPL helps scope infrastructure around workloads, growth and operational needs.',
    requirements:['Record servers, storage, virtualization, locations and application dependencies.', 'Measure utilization, traffic, performance bottlenecks and expected growth.', 'Identify uptime needs, maintenance windows and recovery requirements.', 'List existing management tools, vendor contracts and support ownership.'],
    options:[['manageengine',2],['manageengine',0],['palo-alto-networks',0],['sophos',1]],
    decision:'These portfolio options cover monitoring, device administration and network protection. Server, storage and virtualization hardware choices require a separate requirements review; a security vendor logo does not establish hardware supply coverage.',
    budget:'Compare total costs for licences, capacity, redundancy, hosting, migration and ongoing support. Retain compatible infrastructure when it meets the requirement, and budget for growth rather than an assumed maximum specification.',
    acceptance:['A current inventory and agreed target architecture.', 'Compatibility and workload checks before migration.', 'Documented operating responsibilities and a handover checklist.'],
    related:['network-security','data-protection','managed-services'],
    distinction:'Monitoring helps reveal availability and performance problems; it does not itself provide extra compute capacity or restore a failed application.'
  },
  {
    id:'managed-services', name:'Managed Services', headline:'Define the work you need supported, then choose the tools.',
    intro:'Patching, monitoring, maintenance and support requests can consume an IT team’s day. ITSIPL’s existing service portfolio includes AMC and maintenance, IT monitoring, helpdesk support, IT consultancy and remote management. The proposal should define which tasks are included.',
    requirements:['List sites, devices, applications, working hours and business-critical services.', 'Clarify what your team retains and what ITSIPL is expected to handle.', 'Identify access permissions, change approvals and escalation contacts.', 'Agree reporting, exclusions, support hours and response targets in writing.'],
    options:[['manageengine',0],['manageengine',2],['manageengine',3]],
    decision:'Endpoint Central, OpManager and ServiceDesk Plus address device administration, monitoring and service requests respectively. Keep existing tools if they fit the process; purchasing a tool is separate from purchasing the service to run it.',
    budget:'Costs depend on managed assets, locations, agreed activities, tooling and support coverage. Distinguish vendor product support, ITSIPL delivery work and recurring operational support rather than assuming they are one entitlement.',
    acceptance:['Named owners for changes and escalations.', 'An agreed asset scope and service reporting schedule.', 'A documented support window and exclusions; no implied around-the-clock commitment.'],
    related:['it-infrastructure','endpoint-security','data-protection'],
    distinction:'Managed IT operations and specialist security incident response are different scopes. Any monitoring hours, containment authority or incident-response service must be expressly agreed.'
  },
  {
    id:'data-loss-prevention', name:'Data Loss Prevention', headline:'Control how sensitive information leaves your business.',
    intro:'Customer records, designs and commercial documents can leak through uploads, email or removable media. DLP identifies sensitive content and applies rules to its movement so approved work can continue with appropriate controls.',
    requirements:['Identify the sensitive data, owners and business processes involved.', 'List channels: cloud applications, browser uploads, email, USB and other endpoint transfers.', 'Check operating systems, managed and unmanaged devices, remote users and existing agents.', 'Define acceptable exceptions, employee communication and who reviews policy incidents.'],
    options:[['forcepoint',0],['netskope',0],['manageengine',1]],
    decision:'Compare coverage of the channels you actually need. Evaluate Forcepoint for a multi-channel DLP requirement, Netskope where cloud and web movement is central, and Endpoint DLP Plus for an endpoint-focused requirement. Validate exact operating-system and channel support before deciding.',
    budget:'Users or endpoints, channel coverage, edition, subscription term, hosting and support affect scope. Include policy tuning and incident-review time; a low licence cost does not remove the effort required to operate DLP.',
    acceptance:['Test data classification against representative, non-confidential sample files.', 'Run an observation phase and review false positives with business owners.', 'Pilot blocking, approved exceptions and incident workflows before expanding coverage.'],
    related:['endpoint-security','secure-access','data-protection'],
    distinction:'DLP prevents or detects unauthorized data movement. Backup and disaster recovery restore lost or unavailable data. One does not replace the other.'
  },
  {
    id:'endpoint-security', name:'Endpoint Security', headline:'Protect work devices and decide how alerts will be handled.',
    intro:'Employee computers and servers run the applications that threats can exploit. Endpoint protection aims to stop malicious activity; detection and response tools support investigation and containment when something needs attention.',
    requirements:['Count workstations and servers and list operating systems and versions.', 'Inventory antivirus, device-management tools and agents already installed.', 'Identify remote devices, bandwidth constraints and business-critical applications.', 'Decide whether you need prevention alone, investigation features or a separately scoped managed response service.'],
    options:[['sophos',0],['crowdstrike',0],['crowdstrike',1]],
    decision:'Compare prevention, investigation and response capabilities at equivalent licence levels. Check agent coexistence, operating-system coverage and identity or logging integrations. Run a representative pilot before removing the existing tool.',
    budget:'Device and server counts, modules, retention, subscription length and support scope affect cost. Include migration and rollout effort, and make it clear who will review alerts after deployment.',
    acceptance:['A representative application-compatibility and performance pilot.', 'Verified coverage for supported endpoints, with exceptions recorded.', 'Tested alert routing and documented authorization for response actions.'],
    related:['data-loss-prevention','managed-services','cybersecurity'],
    distinction:'Endpoint threat protection is different from preventing an authorized user from copying confidential files. Review DLP separately when data leakage is the problem.'
  },
  {
    id:'network-security', name:'Network Security', headline:'Choose a firewall around inspected traffic and business access.',
    intro:'A firewall controls traffic between networks, but its value depends on the policies, capacity and deployment design. ITSIPL helps connect appliance or virtual choices to the way your sites and applications operate.',
    requirements:['Document internet links, sites, routing and application flows.', 'Measure encrypted traffic and required inspection rather than only line speed.', 'Define segmentation, remote access, high availability and logging needs.', 'Check identity integration, existing policies and the change window for migration.'],
    options:[['sophos',1],['palo-alto-networks',0]],
    decision:'Evaluate equivalent inspection and resilience requirements. Review compatibility with existing switching, routing, VPNs and management tools. A larger appliance is not automatically a better fit if operating complexity or subscription coverage is wrong.',
    budget:'Include hardware or virtual licensing, security subscriptions, resilience pairs, management, logging, deployment and support. Confirm renewal obligations and the features active at the end of the subscription term.',
    acceptance:['Application flows tested with the intended security inspection enabled.', 'A controlled policy migration and rollback plan.', 'Administrative access, logs and failover behavior checked before handover.'],
    related:['secure-access','it-infrastructure','cybersecurity'],
    distinction:'A firewall refresh and cloud-delivered remote access may be complementary projects. Choose each based on traffic paths and user needs.'
  },
  {
    id:'secure-access', name:'Secure Access', headline:'Give people access to the applications they actually need.',
    intro:'Remote teams and distributed sites need reliable access without unnecessarily exposing internal applications. Start with users, identity and application locations before choosing a cloud access service.',
    requirements:['List private applications, protocols, hosting locations and user groups.', 'Document your identity provider, authentication and device ownership.', 'Identify countries, branch locations, connectivity and latency-sensitive workflows.', 'Check current VPNs, traffic steering and the support plan for remote users.'],
    options:[['palo-alto-networks',1],['netskope',1]],
    decision:'Prisma Access and Netskope One Private Access have different scopes. Compare the precise remote-access requirement and proposed entitlements, not product names alone. Pilot critical application workflows from real user locations.',
    budget:'Users, sites, capacity, subscription scope and support affect the quote. Include integration, application onboarding, client rollout and any complementary data-protection requirements.',
    acceptance:['Access limited to the intended user and application groups.', 'Authentication, device and application compatibility tested.', 'A documented fallback and support process during transition.'],
    related:['network-security','data-loss-prevention','endpoint-security'],
    distinction:'Application access and data leakage controls solve separate requirements. If you need to inspect sensitive content, validate that capability and its licence explicitly.'
  }
];
