
package com.washingtonpost.arc.ans.v0_3.model;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;


/**
 * Video Subtitle Configuration Schema.
 * <p>
 * Data about different subtitle encodings and confidences of auto-transcribed content.
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VideoSubtitles {

    /**
     * How confident the transcriber (human or automated) is of the accuracy of the subtitles.
     * 
     */
    @JsonProperty("confidence")
    private Double confidence;

    /**
     * The locations of any subtitle transcriptions of the video.
     * 
     */
    @JsonProperty("urls")
    private List<VideoSubtitleUrl> urls = new ArrayList<>();

    /**
     * How confident the transcriber (human or automated) is of the accuracy of the subtitles.
     * 
     * @return
     *     The confidence
     */
    @JsonProperty("confidence")
    public Double getConfidence() {
        return confidence;
    }

    /**
     * How confident the transcriber (human or automated) is of the accuracy of the subtitles.
     * 
     * @param confidence
     *     The confidence
     */
    @JsonProperty("confidence")
    public void setConfidence(Double confidence) {
        this.confidence = confidence;
    }

    /**
     * The locations of any subtitle transcriptions of the video.
     * 
     * @return
     *     The urls
     */
    @JsonProperty("urls")
    public List<VideoSubtitleUrl> getUrls() {
        return urls;
    }

    /**
     * The locations of any subtitle transcriptions of the video.
     * 
     * @param urls
     *     The urls
     */
    @JsonProperty("urls")
    public void setUrls(List<VideoSubtitleUrl> urls) {
        this.urls = urls;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }


    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(confidence).append(urls).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof VideoSubtitles) == false) {
            return false;
        }
        VideoSubtitles rhs = ((VideoSubtitles) other);
        return new EqualsBuilder()
                .append(confidence, rhs.confidence)
                .append(urls, rhs.urls)
                .isEquals();
    }
}
