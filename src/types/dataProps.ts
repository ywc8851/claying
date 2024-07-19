export interface DataProps {
	id: string;
	section: string;
	title: string;
	upload_date: string;
	duration: string;
	tags: string;
	thumbnail: string;
	channel_id: string;
	channel_thumbnail: string;
	channel_name: string;
	channel_subscribers: number;
	detail_category: string;
	template_summary: TemplateSummary[];
	headline_title: string;
	headline_subtitle: string;
	short_summary: string;
}

interface TemplateSummary {
	headline: string;
	contents: string;
	start_time: string;
	end_time: string;
}
