
package com.washingtonpost.arc.ans.v0_2.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class VideoSubtitleUrl {

    /**
     * The format of the subtitles (e.g. SRT, DFXP, WEB_VTT, etc)
     * 
     */
    @JsonProperty("format")
    private String format;
    /**
     * The url of the subtitle stream.
     * 
     */
    @JsonProperty("url")
    private String url;


    /**
     * The format of the subtitles (e.g. SRT, DFXP, WEB_VTT, etc)
     * 
     * @return
     *     The format
     */
    @JsonProperty("format")
    public String getFormat() {
        return format;
    }

    /**
     * The format of the subtitles (e.g. SRT, DFXP, WEB_VTT, etc)
     * 
     * @param format
     *     The format
     */
    @JsonProperty("format")
    public void setFormat(String format) {
        this.format = format;
    }

    /**
     * The url of the subtitle stream.
     * 
     * @return
     *     The url
     */
    @JsonProperty("url")
    public String getUrl() {
        return url;
    }

    /**
     * The url of the subtitle stream.
     * 
     * @param url
     *     The url
     */
    @JsonProperty("url")
    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }


    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(format).append(url).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof VideoSubtitleUrl) == false) {
            return false;
        }
        VideoSubtitleUrl rhs = ((VideoSubtitleUrl) other);
        return new EqualsBuilder()
                .append(format, rhs.format)
                .append(url, rhs.url)
                .isEquals();
    }
}
