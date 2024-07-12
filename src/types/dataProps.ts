export interface DataProps {
	id: string;
	section: string;
	title: string;
	upload_date: string;
	duration: string;
	tags: string;
	thumbnail: string;
	channel_id: string;
	detail_category: string;
	template_summary: TemplateSummary[];
	headline: {
		title: string;
		sub_title: string;
	};
	short_summary: string;
}

interface TemplateSummary {
	headline: string;
	contents: string;
	start_time: string;
	end_time: string;
}
