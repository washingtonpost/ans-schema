package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;
import java.util.Map;

/**
 * <p>Tests that JSON we expect to be a valid "Paragraph" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestAudio extends AbstractANSTest<Audio> {

    @Override
    String getSchemaName() {
        return "audio";
    }

    @Override
    Class getTargetClass() {
        return Audio.class;
    }

    @Test
    public void testGood() throws Exception {
        testJsonValidation("audio-fixture-good", true);
        Audio audio = testClassSerialization("audio-fixture-good");
        assertThat(audio.getId(), is("0987654321"));
        assertThat(audio.getType(), is("audio"));
        assertThat(audio.getSourceUrl(), is("https://www.washingtonpost.com/audio/foo/bar.mp3"));
    }

    @Test
    public void testWithSettings() throws Exception {
        testJsonValidation("audio-fixture-good-settings", true);
        Audio audio = testClassSerialization("audio-fixture-good-settings");
        assertThat(audio.getId(), is("0987654321"));
        assertThat(audio.getType(), is("audio"));
        assertThat(audio.getSourceUrl(), is("https://www.washingtonpost.com/audio/foo/bar.mp3"));
        assertThat(audio.getLoop(), is(false));
        assertThat(audio.getControls(), is(true));
        assertThat(audio.getPreload(), is(false));
        assertThat(audio.getAutoplay(), is(true));
    }

    @SuppressWarnings("unchecked")
    @Test
    public void testWithCustom() throws Exception {
        testJsonValidation("audio-fixture-good-custom", true);
        Audio audio = testClassSerialization("audio-fixture-good-custom");
        assertThat(audio.getId(), is("0987654321"));
        assertThat(audio.getType(), is("audio"));
        assertThat(audio.getSourceUrl(), is("https://www.washingtonpost.com/audio/foo/bar.mp3"));
        Map<String,Object> map = audio.getAdditionalProperties();
        map = (Map<String, Object>) map.get("custom");
        assertThat(map.get("playerLogo"), is("https://www.washingtonpost.com/logo.png"));
    }


    @Test
    public void testBad() throws Exception {
        testJsonValidation("audio-fixture-bad", false);
    }

}
